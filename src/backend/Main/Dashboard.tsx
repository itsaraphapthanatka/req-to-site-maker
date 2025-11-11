'use client';
import React from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Typography } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    FileOutlined,
    TeamOutlined,
    BarChartOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    return (
        <Content>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Total Users" value={1128} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Active Projects" value={93} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tasks Completed" value={789} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Revenue" value={21500} prefix="$" />
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Card title="Recent Activity">
                        {/* Add your content here */}
                        <p>Recent activity content goes here...</p>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default Dashboard;