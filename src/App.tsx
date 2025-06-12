import '@mantine/core/styles.css';
import './App.css'
import {Button, Group, MantineProvider, Stack, Textarea} from '@mantine/core';
import type {ProtocolType, StatusField} from "./Types/Protocol.type.ts";
import {Protocol} from "./Components/Protocol.tsx";
import '@mantine/dates/styles.css';
import {useState} from "react";
import {DateInput} from "@mantine/dates";
import {TESTPHASE2} from "./testdata.ts";

function App() {
    const [protocolData, setProtocolData] = useState<ProtocolType>(TESTPHASE2);
    const [hidePhase1, setHidePhase1] = useState<boolean>(false)

    const updateField = (categoryName: string, fieldKey: string, newValue: StatusField) => {
        setProtocolData(prev => {
            const newData = new Map(prev.data)
            const categoryMap = new Map(newData.get(categoryName))
            categoryMap.set(fieldKey, newValue)
            newData.set(categoryName, categoryMap)
            return {...prev, data: newData}
        })
    }

    const updateProtocolData = (updates: Partial<ProtocolType>) => {
        setProtocolData(prev => ({...prev, ...updates}))
    }

    const emptyFields = () => {
        setProtocolData(prev => {
            const newData = new Map<string, Map<string, StatusField>>();
            [...prev.data.entries()].forEach(([categoryName, categoryFields]) => {
                const emptyFields = new Map<string, StatusField>();
                [...categoryFields.entries()].forEach(([fieldKey, oldField]) => {
                    if ((protocolData.phase === "1") || ((protocolData.phase === "2") && (oldField.phase === "2"))) {
                        emptyFields.set(fieldKey, {
                            status: 'abweichung',
                            freitext: "",
                            phase: oldField.phase,
                            link: oldField.link,
                            klarname: oldField.klarname,
                        });
                    } else {
                        emptyFields.set(fieldKey, oldField)
                    }
                });
                newData.set(categoryName, emptyFields);
            });

            return {
                ...prev,
                data: newData,
                comment: '',
                date: ''
            };
        })
    }

    const exportAsJSON = () => {
        const result = {
            phase: protocolData.phase,
            comment: protocolData.comment,
            date: protocolData.date,
            data: Object.fromEntries(
                [...protocolData.data.entries()].map(([key, fields]) =>
                    [key, Object.fromEntries([...fields.entries()])])
            )
        }
        console.log(JSON.stringify(result, null, 2))
    }

    const ExportButtons = () => (<Group className="mb-20" justify="center">
            <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern</Button>
            <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern und PDF erstellen</Button>
            <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern, PDF erstellen und
                verschicken</Button>
            <Button radius="lg" variant="filled" color="red" onClick={emptyFields}>Eingaben löschen</Button>
        </Group>
    )

    return (
        <MantineProvider>
            <Stack align="center">
                <Stack className="w-full max-w-[1300px] p-10">
                    <p className="text-center mb-5 font-bold text-5xl">Abnahmeprotokoll Phase {protocolData.phase}</p>
                    <Stack gap="xs">
                        <p className="pl-2 font-bold">Datum</p>
                        <DateInput size="md" radius="lg" value={protocolData.date}
                                   onChange={(date) => date ? updateProtocolData({date}) : undefined}
                                   valueFormat="DD.MM.YYYY"
                                   defaultValue={new Date()}
                                   locale="de-DE"/>
                    </Stack>
                    <Stack gap="xs">
                        <p className="pl-2 font-bold">Kommentar</p>
                        <Textarea
                            radius="lg"
                            resize="vertical"
                            value={protocolData.comment}
                            onChange={(event) => updateProtocolData({comment: event.currentTarget.value})}
                        />
                    </Stack>
                    {protocolData.phase === "2" &&
                        <Button className="max-w-52" radius="lg" variant="filled"
                                onClick={() => setHidePhase1(!hidePhase1)}>Phase 1
                            verstecken</Button>}
                    {[...protocolData.data.entries()]
                        .filter(([, categoryEntries]) => { //filter to order the categories alphabetically
                            if (protocolData.phase === "2") return true;
                            return [...categoryEntries.entries()].some(([, values]) =>
                                values.phase === "1"
                            );
                        })
                        .map(([categoryName, categoryEntries]) => (
                            <Protocol
                                onFieldUpdate={(fieldKey, newValue) => updateField(categoryName, fieldKey, newValue)}
                                hidePhase1={hidePhase1}
                                phase={protocolData.phase}
                                categoryName={categoryName}
                                entries={categoryEntries}
                            />
                        ))}
                </Stack>
                <ExportButtons/>
            </Stack>
        </MantineProvider>
    )
}

export default App
