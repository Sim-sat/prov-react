import {useState} from 'react';
import {
    IconChevronDown,
    IconChevronUp,
    IconDotsVertical,
    IconEdit,
    IconEye,
    IconSearch,
    IconSelector,
    IconTrash
} from '@tabler/icons-react';
import {Button, Center, Group, keys, Menu, ScrollArea, Table, Text, TextInput, UnstyledButton,} from '@mantine/core';
import classes from '../Reseller/ResellerTable.module.css';
import {useNavigate} from "react-router";


interface RowData {
    hostname: string;
    customer: string;
    model: string;
    posNr: string;
    dID: string
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort: () => void;
}

function Th({children, reversed, sorted, onSort}: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={16} stroke={1.5}/>
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const {sortBy} = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

const data = [
    {
        hostname: "fg-100.cos-104.customer",
        customer: "CTDI PROVISIONTEST",
        model: "FG100f",
        posNr: "P1000001",
        dID: "HWD23423535"
    },
    {
        hostname: "fg-102.cos-104.customer",
        customer: "CTDI PROVISIONTEST2",
        model: "FG100f",
        posNr: "P1000002",
        dID: "HWD23423535"
    },


];

export function MaschinenTable() {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const navigate = useNavigate();

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, {sortBy: field, reversed, search}));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, {sortBy, reversed: reverseSortDirection, search: value}));
    };

    const MyMenu = () => {
        return (
            <Menu trigger="hover" shadow="md" width={150}>
                <Menu.Target>
                    <Button variant="subtle" size="xs"><IconDotsVertical/></Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconEye size={14}/>}>
                        Anzeigen
                    </Menu.Item>
                    <Menu.Item leftSection={<IconEdit size={14}/>}>
                        Ändern
                    </Menu.Item>
                    <Menu.Item color="red" leftSection={<IconTrash size={14}/>}>
                        Löschen
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>)
    }

    const rows = sortedData.map((row) => (
        <Table.Tr onDoubleClick={() => navigate(`/machine/view/${row.hostname}`)} key={row.hostname}>
            <Table.Td>{row.hostname}</Table.Td>
            <Table.Td>{row.customer}</Table.Td>
            <Table.Td>{row.model}</Table.Td>
            <Table.Td>{row.posNr}</Table.Td>
            <Table.Td>{row.dID}</Table.Td>
            <Table.Td style={{width: "20px"}}> <MyMenu/> </Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch size={16} stroke={1.5}/>}
                value={search}
                onChange={handleSearchChange}
            />
            <Table.ScrollContainer minWidth={500} maxHeight={700}>
                <Table stickyHeader highlightOnHover withTableBorder horizontalSpacing="md" verticalSpacing="xs"
                       miw={700}
                       layout="auto">
                    <Table.Tbody>
                        <Table.Tr>
                            <Th
                                sorted={sortBy === 'hostname'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('hostname')}
                            >
                                Hostname
                            </Th>
                            <Th
                                sorted={sortBy === 'customer'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('customer')}
                            >
                                Kunde
                            </Th>
                            <Th
                                sorted={sortBy === 'model'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('model')}
                            >
                                Modell
                            </Th>
                            <Th
                                sorted={sortBy === 'posNr'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('posNr')}
                            >
                                Positionsnummer
                            </Th>
                            <Th
                                sorted={sortBy === 'dID'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('dID')}
                            >
                                Dienst-Id
                            </Th>

                        </Table.Tr>
                    </Table.Tbody>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={Object.keys(data[0]).length}>
                                    <Text fw={500} ta="center">
                                        Nothing found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </ScrollArea>
    );
}