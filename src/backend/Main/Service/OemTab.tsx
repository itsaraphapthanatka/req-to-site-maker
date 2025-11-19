import React, { useContext, useMemo } from 'react';
import { HolderOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table, Flex } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns: TableColumnsType<DataType> = [
  { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
  { title: 'Action', key: 'action', render: () => handleDelete() },
];

const initialData: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'Long text Long' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
];

const handleDelete = () => {
    return (
        <>
            <Button type="text" icon={<EditOutlined />} />
            <Button type="text" danger icon={<DeleteOutlined />} />
        </>
    );
};


interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const OemTab: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);
  const navigate = useNavigate();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  // ⬇️ Move columns inside component so "navigate" can be used
  const columns: TableColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <>
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={(e) => {
                e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
                alert(`Edit ${record.key}`);
                }}
            />
            <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
                alert(`Delete ${record.key}`);
                }}
            />
            </>
        ),
        }

  ];

  return (
    <>
      <Flex justify='flex-end' align='flex-Start' className='mb-5'>
        <Button type="primary">Add</Button>
      </Flex>

      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <Table<DataType>
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
            onRow={(record) => ({
              onClick: () => navigate(`/odm/${record.key}`)
            })}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};


export { OemTab };