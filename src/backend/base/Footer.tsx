import React from 'react';
import { Layout, Row, Col, Space } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
    return (
         <Footer style={{ textAlign: 'center' }}>
            saranya ©{new Date().getFullYear()} Created by Saranya
        </Footer>
    );
};

export default AppFooter;