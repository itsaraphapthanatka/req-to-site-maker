// components/DraggableTable.tsx
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // จะสร้างต่อไป

interface DraggableTableProps<T> {
    columns: ColumnsType<T>;
    data: T[];
    rowKey: string;
    onDragEnd?: (newData: T[]) => void;
}

export const DraggableTable = <T extends { id: number | string }>({
    columns,
    data,
    rowKey,
    onDragEnd,
}: DraggableTableProps<T>) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = data.findIndex((i) => i.id === active.id);
            const newIndex = data.findIndex((i) => i.id === over?.id);
            const newData = arrayMove(data, oldIndex, newIndex);
            onDragEnd?.(newData);
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={data.map((d) => d.id)} strategy={verticalListSortingStrategy}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={rowKey}
                    pagination={false}
                    components={{
                        body: {
                            row: SortableItem, // ใช้คอมโพเนนต์ sortable row
                        },
                    }}
                />
            </SortableContext>
        </DndContext>
    );
};
