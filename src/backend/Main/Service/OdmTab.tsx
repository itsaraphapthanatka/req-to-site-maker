import React, { useContext, useMemo, useState, useEffect } from 'react';
import { HolderOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table, Flex, Input, Modal, TableColumnsType, Form, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { getOdmService, addOdmService, deleteOdmService, updateOdmServiceOrderTable } from '@/server/service';

interface DataType {
  id: number;
  name: string;
  name_th: string;
  position?: number;
}

interface RowContextProps {
  setActivatorNodeRef?: (el: HTMLElement | null) => void;
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
      ref={setActivatorNodeRef}
      style={{ cursor: 'grab', padding: 4 }}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
  const id = String(props['data-row-key']);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    ...props.style,
    // use CSS.Translate.toString(transform) for better handling
    transform: CSS.Translate.toString(transform) || undefined,
    transition,
    cursor: 'grab',
    willChange: 'transform',       // helps smoothness
    touchAction: 'none',          // helps on touch devices
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners]);

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const OdmTab: React.FC = () => {
  const navigate = useNavigate();
  const [odmdata, setodmdata] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [msgApi, msgHolder] = message.useMessage();

  // sensors: small delay + distance to reduce accidental drag and improve UX
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 120, tolerance: 5 } })
  );

  const fetchOdmData = async () => {
    setLoading(true);
    try {
      const response = await getOdmService();
      const items = Array.isArray(response) ? response : [];
      items.sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
      setodmdata(items);
    } catch (error) {
      console.error('fetchOdmData error', error);
      msgApi.error('Failed to load OEM list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOdmData();
  }, []);

  const handleAddOdmData = async (values: any) => {
    try {
      await addOdmService(values);
      msgApi.success('Added');
      await fetchOdmData();
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.error('add error', err);
      msgApi.error('Add failed');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteOdmService(id);
      msgApi.success('Deleted');
      await fetchOdmData();
    } catch (err) {
      console.error('delete error', err);
      msgApi.error('Delete failed');
    }
  };

  // onDragEnd: robust (string/number), optimistic UI and persist order
  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    console.log('drag end:', { activeId, overId });

    setodmdata((prev) => {
      const oldIndex = prev.findIndex((i) => String(i.id) === activeId);
      const newIndex = prev.findIndex((i) => String(i.id) === overId);
      if (oldIndex === -1 || newIndex === -1) {
        console.warn('index not found', { oldIndex, newIndex });
        return prev;
      }
      const newArr = arrayMove(prev, oldIndex, newIndex);
      // optimistic update done (UI already shows new order)

      // persist to server (send array of ids only)
      const orderIds = newArr.map((it) => it.id);
      console.log('sending order to server', orderIds);

      // call API (assume updateOdmServiceOrder expects array of ids)
      updateOdmServiceOrderTable(orderIds)
        .then(() => {
          msgApi.success('Order saved');
        })
        .catch((err) => {
          console.error('save order error', err);
          msgApi.error('Failed to save order — reloading');
          // revert by refreshing from server
          fetchOdmData();
        });

      return newArr;
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      key: 'sort',
      align: 'center',
      width: 70,
      render: () => <DragHandle />,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <span>{record.id}</span>
      ),
    },
    {
      title: 'Name', dataIndex: 'name', render: (_, record) => (
        <>
          <p>{record.name}</p>
          <p>{record.name_th}</p>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (

        <>
          {/* <Button type="text" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); navigate(`/odm/${record.id}`) }} /> */}
          <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); handleDelete(record.id) }} />
        </>
      ),
    },
  ];

  return (
    <>
      {msgHolder}
      <Flex justify="flex-end" className="mb-5">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add</Button>
      </Flex>

      <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={odmdata.map((i) => String(i.id))} strategy={verticalListSortingStrategy}>
          <Table
            rowKey={(record) => String(record.id)}
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={odmdata}
            loading={loading}
            onRow={(record) => ({
              onClick: () => navigate(`/admin/odm/${record.id}`),
            })}
          />
        </SortableContext>
      </DndContext>

      <Modal title="Add OEM" open={isModalOpen} onOk={() => form.submit()} onCancel={() => setIsModalOpen(false)} okText="Add">
        <Form form={form} layout="vertical" onFinish={handleAddOdmData}>
          <Form.Item name="name" label="OEM Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name_th" label="OEM Title (Thai)">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { OdmTab };
