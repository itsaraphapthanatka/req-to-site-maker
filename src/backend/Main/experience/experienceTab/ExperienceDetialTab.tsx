import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { HolderOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DragEndEvent, DraggableAttributes } from '@dnd-kit/core';
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
import { Button, List, Image, Upload, Divider, message, Space } from 'antd';
import type { UploadFile, UploadChangeParam, UploadProps } from 'antd/es/upload';

import { getExperience, uploadExperienceImage, reorderExperience, deleteExperience } from '@/server/experience';


// ========== Context for Sortable Item ==========
interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});


// ========== Drag Handle ==========
const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);

  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      style={{ cursor: 'grab' }}
    />
  );
};


// ========== Sortable List Item ==========
interface SortableListItemProps
  extends React.PropsWithChildren<React.ComponentProps<typeof List.Item>> {
  itemKey: number | string;
}

const SortableListItem: React.FC<SortableListItemProps> = ({
  itemKey,
  children,
  style,
  ...rest
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const memoValue = useMemo(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes]
  );

  return (
    <SortableListItemContext.Provider value={memoValue}>
      <List.Item ref={setNodeRef} style={listStyle} {...rest}>
        {children}
      </List.Item>
    </SortableListItemContext.Provider>
  );
};


// API call wrapper
const handleReorderExperience = async (order: number[]) => {
  await reorderExperience({ order });
};



// ========== MAIN COMPONENT ==========
const ExperienceDetialTab: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<
    Array<{ key: number | string; image?: string; position?: number }>
  >([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // ===== FETCH EXPERIENCE =====
  const fetchExperience = async () => {
    try {
      const resp = await getExperience();
      const items = Array.isArray(resp) ? resp : [];

      setData(
        items.map((it) => ({
          key: it.id,
          image: it.img,
          position: it.position,
        }))
      );
    } catch (err) {
      console.error(err);
      messageApi.error('Failed to load experience list');
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);


  // ===== UPLOAD HANDLER =====
  const handleUploadChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    if (!fileList.length) return messageApi.error('Please select an image');

    const fileObj = fileList[0].originFileObj;

    if (!fileObj) return messageApi.error('Invalid file');

    const formData = new FormData();
    formData.append('file', fileObj);

    try {
      await uploadExperienceImage(formData);
      messageApi.success('Upload success');
      setFileList([]);
      fetchExperience();
    } catch (err) {
      console.error(err);
      messageApi.error('Upload failed');
    }
  };


  // ===== DRAG END =====
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over || active.id === over.id) return;

    setData((prev) => {
      const oldIndex = prev.findIndex((i) => i.key === active.id);
      const newIndex = prev.findIndex((i) => i.key === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const newArr = arrayMove(prev, oldIndex, newIndex);
      handleReorderExperience(newArr.map((i) => Number(i.key)));

      messageApi.info(`Moved item ${active.id}`);

      return newArr;
    });
  };


  const uploadProps: UploadProps = {
    beforeUpload: () => false,
    fileList,
    onChange: handleUploadChange,
    accept: '.png,.jpg,.jpeg',
    maxCount: 1,
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExperience(id);
      messageApi.success('Delete success');
      fetchExperience();
    } catch (err) {
      console.error(err);
      messageApi.error('Delete failed');
    }
  };


  return (
    <>
      {contextHolder}

      <Space style={{ marginBottom: 16 }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Choose Image</Button>
        </Upload>

        <Button type="primary" disabled={!fileList.length} onClick={handleUpload}>
          Upload
        </Button>
      </Space>

      <Divider />

      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={data.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <SortableListItem key={item.key} itemKey={item.key}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <DragHandle />
                  <div>{item.key}</div>
                  {item.image && <Image width={60} src={item.image} />}
                  <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(item.key as number)} />
                </div>
              </SortableListItem>
            )}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export { ExperienceDetialTab };
