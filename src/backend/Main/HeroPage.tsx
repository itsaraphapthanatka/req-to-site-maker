import React, { useContext, useEffect, useMemo, useState } from "react";
import { HolderOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Layout, Typography, Table, Button, Flex, Modal, Form, Input, Upload, message } from "antd";
const { TextArea } = Input;
import type { TableColumnsType, UploadFile, UploadProps } from "antd";
import { getSlide, uploadSlideImage, reorderSlide, deleteSlide } from "../../server/slide";
import { RcFile } from "antd/es/upload";

const { Content } = Layout;
const { Title } = Typography;

interface DataType {
  id: number;
  slide_image: string;
  slide_desc: string;
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
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const id = String(props["data-row-key"]);

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
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

// ⚡ เปลี่ยนเป็นรับ array order แทน old/new index
const handleReorderSlide = async (order: number[]) => {
  try {
    await reorderSlide({ order });
    message.success("Reorder slide successfully!");
  } catch (error) {
    console.error(error);
    message.error("Reorder slide failed");
  }
};

const HeroPage: React.FC = () => {
  const [slideData, setSlideData] = React.useState<DataType[]>([]);
  const [slideLoading, setSlideLoading] = React.useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  // ไม่ upload ตอนเลือก file — แค่เก็บไว้ก่อน
  const handleUploadChange: UploadProps["onChange"] = ({ fileList: newList }) => {
    setFileList(newList);
  };

  const beforeUpload: UploadProps["beforeUpload"] = (file: RcFile) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg";
    if (!isPNG && !isJPG) {
      message.error(`${file.name} is not a PNG or JPG file`);
      return Upload.LIST_IGNORE;
    }
    return isPNG || isJPG;
  };

  const handleAddSlide = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("slide_desc", values.slide_desc);
    formData.append("file", fileList[0].originFileObj as File);

    try {
      await uploadSlideImage(formData);
      message.success("Slide added successfully!");

      form.resetFields();
      setFileList([]);
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
      message.error("Upload failed");
    }
  };

  const fetchData = async () => {
    try {
      setSlideLoading(true);
      const res = await getSlide();
      const items = (Array.isArray(res) ? res : []).map((item: any) => ({
        id: item.id,
        slide_image: item.slide_image,
        slide_desc: item.slide_desc,
      }));
      setSlideData(items);
    } catch (error) {
      console.error(error);
    } finally {
      setSlideLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🎯 FIXED — ไม่มี error sortable index แล้ว
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setSlideData((prev) => {
      const activeId = String(active.id);
      const overId = String(over.id);

      const oldIndex = prev.findIndex((i) => String(i.id) === activeId);
      const newIndex = prev.findIndex((i) => String(i.id) === overId);

      if (oldIndex === -1 || newIndex === -1) {
        console.warn("sortable index not found", { active, over, prev });
        return prev;
      }

      const newArr = arrayMove(prev, oldIndex, newIndex);

      // ส่ง order แบบ id array ให้ backend
      handleReorderSlide(newArr.map((i) => i.id));

      return newArr;
    });
  };

  const ActionButtons: React.FC<{ record: DataType }> = ({ record }) => {
    const handleEdit = () => console.log("Edit", record.id);

    const handleDelete = async (id: number) => {
      const res = await deleteSlide(id);
      if (res) {
        message.success("Delete slide successfully!");
        fetchData();
      }
    };

    return (
      <>
        <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      </>
    );
  };

  const columns: TableColumnsType<DataType> = [
    {
      key: "sort",
      align: "center",
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: "source",
      dataIndex: "slide_image",
      render: (_, record) =>
        record.slide_image.includes(".mp4") ? (
          <video width={200} height={200} src={record.slide_image} autoPlay loop muted />
        ) : (
          <img width={200} height={200} src={record.slide_image} alt="slide_image" />
        ),
    },
    { title: "description", dataIndex: "slide_desc" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <ActionButtons record={record} />,
    },
  ];

  return (
    <Layout>
      <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
        <Title level={1}>Welcome to Slide</Title>
        <Flex justify="end">
          <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
            Add Slide
          </Button>
        </Flex>

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext items={slideData.map((i) => String(i.id))} strategy={verticalListSortingStrategy}>
            <Table<DataType>
              rowKey={(record) => String(record.id)}
              components={{ body: { row: Row } }}
              columns={columns}
              dataSource={slideData}
              loading={slideLoading}
              pagination={false}
            />
          </SortableContext>
        </DndContext>

        <Modal
          title="Add Slide"
          open={isModalVisible}
          onOk={() => form.submit()}
          onCancel={() => {
            form.resetFields();
            setFileList([]);
            setIsModalVisible(false);
          }}
          okText="Add"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" onFinish={handleAddSlide}>
            <Form.Item name="uploadPicture">
              <Upload
                fileList={fileList}
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Upload PNG or JPG only</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="slide_desc"
              label="Description"
              rules={[{ required: true, message: "Please input description" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default HeroPage;
