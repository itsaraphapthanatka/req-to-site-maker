import React, { createContext, useContext, useMemo, useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
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
import { Button, List, Image, Flex, Upload, Divider } from 'antd';
import type { GetProps } from 'antd';
import { message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableListItem: React.FC<GetProps<typeof List.Item> & { itemKey: number }> = (props) => {
  const { itemKey, style, ...rest } = props;

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

  const memoizedValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item {...rest} ref={setNodeRef} style={listStyle} />
    </SortableListItemContext.Provider>
  );
};

const ExperienceDetialTab: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = (e) => {
    messageApi.info(`Move Image: ID ${e}`);
  };

  const [data, setData] = useState([
    { key: 1,image: "https://saranya.appreview.asia/assets/ex1-CNoHJ2NR.jpg", content: 'Racing car sprays burning fuel into crowd.' },
    { key: 2,image: 'https://saranya.appreview.asia/assets/ex2-l7aWHQCw.jpg', content: 'Japanese princess to wed commoner.' },
    { key: 3,image: 'https://saranya.appreview.asia/assets/ex3-9PtPJ9ZB.jpg', content: 'Australian walks 100km after outback crash.' },
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setData((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active.id);
        const overIndex = prevState.findIndex((i) => i.key === over.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
      info(active.id);
    //   alert(`${active.id}`);
    }
  };

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

};



  return (
    <>
    {contextHolder}
    <Flex justify='flex-start' align='flex-Start' className='mb-5'>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    </Flex>
    <Divider />
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      id="list-drag-sorting-handler"
    >
      <SortableContext items={data.map((item) => item.key)} strategy={verticalListSortingStrategy}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <DragHandle /> {item.key} <Image width={50} src={item.image}  />
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  </>
  );
};

export { ExperienceDetialTab};