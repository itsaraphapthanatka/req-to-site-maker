// components/SortableItem.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem: React.FC<any> = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props['data-row-key'] });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.children}
        </tr>
    );
};
