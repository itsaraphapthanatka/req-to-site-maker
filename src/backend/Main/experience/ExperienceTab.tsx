import React, { useState } from "react";
import { Tabs } from 'antd'
import { ExperienceDetialTab } from "./experienceTab/ExperienceDetialTab";
import { ProfessionalTeamTab } from "./experienceTab/ProfessionalTeamTab";
import { NaturalFiberTab } from "./experienceTab/NaturalFiberTab";
import { InternationalStandardTab } from "./experienceTab/InternationalStandardTab";

const ExperienceTab: React.FC = () => {

    const itemTab = [
        {
            key: '1',
            label: 'Experience',
            children: <ExperienceDetialTab />
        },
        {
            key: '2',
            label: 'Professional Team',
            children: <ProfessionalTeamTab />,
        },
        {
            key: '3',
            label: 'Natural Fibers',
            children: <NaturalFiberTab />
        },
        {
            key: '4',
            label: 'International Standards',
            children: <InternationalStandardTab />
        }
    ]

    return (
        <>
            <Tabs
                type="card"
                defaultActiveKey="1"
                items={itemTab}
            />
        </>
    );
}

export { ExperienceTab }