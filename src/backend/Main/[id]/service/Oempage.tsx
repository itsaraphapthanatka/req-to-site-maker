import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Layout,
    Typography,
    Table,
    Button,
    Space,
    Upload,
    Divider,
    Image,
    message,
} from "antd";
import {
    HolderOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import type { TableColumnsType, UploadFile, UploadProps } from "antd";

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

import {
    getOemServiceDetail,
    deleteOemServiceDetail,
    uploadOemServiceImage,
    updateOemServiceOrder,
} from "@/server/service";

const { Content } = Layout;
const { Title } = Typography;

// ----------------- Interfaces -----------------
interface DataType {
    id: number;
    name: string;
    img: string;
}

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

// ----------------- Drag Handle -----------------
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

// ----------------- Sortable Row -----------------
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

// ----------------- Helper: Save Order -----------------
const saveOrder = async (serviceId: number, order: number[]) => {
    try {
        await updateOemServiceOrder(serviceId, order);
        message.success("Order updated successfully");
    } catch (err) {
        console.error(err);
        message.error("Failed to update order");
    }
};

// ----------------- Main Page -----------------
const ServiceOemPage: React.FC = () => {
    const { id } = useParams();
    const serviceId = Number(id);

    const [service, setService] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchService = async () => {
        if (!serviceId) return;
        try {
            setLoading(true);
            const res = await getOemServiceDetail(serviceId);
            const items = (Array.isArray(res) ? res : [])
                .map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    position: item.position,
                }))
                .sort((a, b) => a.position - b.position);
            setService(items);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch service");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id]);

    const handleDelete = async (oemDetailId: number) => {
        try {
            await deleteOemServiceDetail(oemDetailId);
            message.success("Deleted successfully");
            fetchService();
        } catch (err) {
            console.error(err);
            message.error("Delete failed");
        }
    };

    // Upload
    const handleUploadChange: UploadProps["onChange"] = ({ fileList: newList }) => {
        setFileList(newList);
    };

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
        const isValid = ["image/png", "image/jpeg"].includes(file.type);
        if (!isValid) {
            message.error(`${file.name} is not a PNG or JPG file`);
            return Upload.LIST_IGNORE; // ไม่อนุญาต
        }
        return false; // หยุดการอัปโหลดอัตโนมัติ แต่เก็บ file ใน fileList
    };

    const handleUpload = async () => {
        if (!serviceId) {
            messageApi.error("Invalid service id");
            return;
        }

        if (fileList.length === 0) {
            messageApi.error("Please select an image");
            return;
        }

        const fileObj = fileList[0].originFileObj;
        if (!fileObj) {
            messageApi.error("Invalid file");
            return;
        }

        try {
            await uploadOemServiceImage(serviceId, fileObj as File);
            messageApi.success("Upload success");
            setFileList([]);
            fetchService();
        } catch (err) {
            console.error(err);
            messageApi.error("Upload failed");
        }
    };

    // DnD
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;

        setService((prev) => {
            const activeId = String(active.id);
            const overId = String(over.id);

            const oldIndex = prev.findIndex((i) => String(i.id) === activeId);
            const newIndex = prev.findIndex((i) => String(i.id) === overId);

            if (oldIndex === -1 || newIndex === -1) {
                console.warn("sortable index not found", { active, over, prev });
                return prev;
            }

            const newArr = arrayMove(prev, oldIndex, newIndex);

            if (serviceId) {
                // ส่งเป็น array ของ id
                saveOrder(serviceId, newArr.map((i) => i.id));
            }

            return newArr;
        });
    };

    const columns: TableColumnsType<DataType> = [
        {
            key: "sort",
            align: "center",
            width: 80,
            render: () => <DragHandle />,
        },
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
        },
        {
            title: "Image",
            dataIndex: "img",
            render: (img: string) => (
                <Image
                    src={img}
                    width={120}
                    style={{ borderRadius: 6, objectFit: "cover" }}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            {contextHolder}
            <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
                <Title level={2}>OEM Service Detail {id}</Title>

                <Space style={{ marginBottom: 16 }}>
                    <Upload
                        fileList={fileList}
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined />}>Choose Image</Button>
                    </Upload>
                    <Button type="primary" onClick={handleUpload} disabled={!fileList.length}>
                        Upload
                    </Button>
                </Space>

                <Divider />

                <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext
                        items={service.map((i) => String(i.id))}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table<DataType>
                            rowKey={(record) => String(record.id)}
                            components={{ body: { row: Row } }}
                            columns={columns}
                            dataSource={service}
                            loading={loading}
                            pagination={false}
                        />
                    </SortableContext>
                </DndContext>
            </Content>
        </Layout>
    );
};

export default ServiceOemPage;
