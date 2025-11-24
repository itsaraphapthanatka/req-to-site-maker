import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter: React.FC = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            SARANYA ©{new Date().getFullYear()} Created by Saranya
        </Footer>
    );
};

export default AppFooter;