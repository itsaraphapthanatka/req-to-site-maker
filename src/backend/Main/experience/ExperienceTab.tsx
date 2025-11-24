import React, { useState } from "react";
import { About } from "../AboutPage";
import { Tabs } from 'antd'
import { ExperienceDetialTab } from "./experienceTab/ExperienceDetialTab";
import { ProfessionalTeamTab } from "./experienceTab/ProfessionalTeamTab";
import { NaturalFiberTab } from "./experienceTab/NaturalFiberTab";
import { InternationalStandardTab } from "./experienceTab/InternationalStandardTab";

interface ExperienceTabProps {
    data: About[];
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ data }) => {

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