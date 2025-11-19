import React, { useContext, useMemo } from "react";
import { HolderOutlined, DeleteOutlined, EditOutlined  } from '@ant-design/icons';
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
import { Layout, Menu, Typography, Table, Button } from "antd";
import type { TableColumnsType } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

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

const handleDelete = () => {
  
  return (
    <>
    <Button type="text" icon={<EditOutlined />} />
    <Button type="text" danger icon={<DeleteOutlined />} />
    </>
  );
}
const initialData: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'Long text Long' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
  { key: '5', name: 'Jake White', age: 28, address: 'Dublin No. 2 Lake Park' },
  { key: '6', name: 'Liam Smith', age: 36, address: 'New York No. 3 Lake Park' },
  { key: '7', name: 'Noah Johnson', age: 45, address: 'Chicago No. 4 Lake Park' },
  { key: '8', name: 'William Brown', age: 29, address: 'San Francisco No. 5 Lake Park' },
  { key: '9', name: 'James Jones', age: 31, address: 'Miami No. 6 Lake Park' },
  { key: '10', name: 'Oliver Garcia', age: 27, address: 'Seattle No. 7 Lake Park' },
  { key: '11', name: 'Elijah Martinez', age: 33, address: 'Boston No. 8 Lake Park' },
  { key: '12', name: 'Benjamin Rodriguez', age: 38, address: 'Austin No. 9 Lake Park' },
];

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

const HeroPage: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Title level={1}>Welcome to Slide</Title>
        <Button type="primary" style={{ marginBottom: 16 }}>Add Slide</Button>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
            <Table<DataType>
              rowKey="key"
              components={{ body: { row: Row } }}
              columns={columns}
              dataSource={dataSource}
            />
          </SortableContext>
        </DndContext>
        
      </Content>
    </Layout>
  );
};

export default HeroPage;