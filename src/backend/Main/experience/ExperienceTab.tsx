import React, { useState } from "react";
import { Tabs } from 'antd'

const ExperienceTab: React.FC = () => {

    const itemTab = [
        {
            key: '1',
            label: 'Experience',
            // children: <DetailTab />
        },
        {
            key: '2',
            label: 'Professional Team',
            // children: <ExperienceTab />,
        },
        {
            key: '3',
            label: 'Natural Fibers'
        },
        {
            key: '4',
            label: 'International Standards'
        }
    ]

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                items={itemTab}
            />
        </>
    );
}

export { ExperienceTab }