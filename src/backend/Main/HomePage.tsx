import React from "react";
import { Flex, Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    border: '1px solid #d6691cff',
};

const HomePage: React.FC = () => {
    return (
        <>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                }}

            >
                <Flex style={boxStyle} justify='center' align='center'>
                    <Title level={1}>Welcome To Saranya Portal</Title>

                </Flex>

            </Content>

        </>
    );
}

export { HomePage }