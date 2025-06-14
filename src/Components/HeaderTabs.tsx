import {Container, Tabs,} from '@mantine/core';

import classes from './HeaderTabs.module.css';
import {useNavigate} from "react-router";

const tabs = [
    {label: 'Reseller', path: '/reseller'},
    {label: 'Kunden', path: '/customer'},
    {label: 'Maschinen', path: '/maschine'},
    {label: 'Modelle', path: '/model'},
    {label: 'Protokoll', path: '/protocol'},
];


export function HeaderTabs() {

    const navigate = useNavigate();

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab.label} onClick={() => navigate(tab.path)} key={tab.label}>
            {tab.label}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}