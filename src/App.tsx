import '@mantine/core/styles.css';
import './App.css'
import {Button, Group, MantineProvider, Stack, Textarea} from '@mantine/core';
import type {ProtocolType, StatusField} from "./Types/Protocol.type.ts";
import {Protocol} from "./Components/Protocol.tsx";
import '@mantine/dates/styles.css';
import {useEffect, useState} from "react";
import {DateInput} from "@mantine/dates";
//import jsonData from "./input.json";

function App() {

    //testing without api    const [protocolData, setProtocolData] = useState<ProtocolType>(jsonData);
    const [protocolData, setProtocolData] = useState<ProtocolType>({
        date: "",
        phase: "",
        comment: "",
        data: {}
    });
    const [hidePhase1, setHidePhase1] = useState<boolean>(false)

    const updateField = (category: string, field: string, newValue: StatusField) => {
        setProtocolData(prev => {
            const newData = {
                ...prev.data, [category]: {
                    ...prev.data[category],
                    [field]: newValue
                }
            };
            return {...prev, data: newData}
        })
    }

    const updateProtocolData = (updates: Partial<ProtocolType>) => {
        setProtocolData(prev => ({...prev, ...updates}))
    }

    const emptyFields = () => {
        setProtocolData(prev => {
            const newData: { [categoryName: string]: { [fieldKey: string]: StatusField } } = {};

            Object.entries(prev.data).forEach(([categoryName, categoryFields]) => {
                const emptyFields: { [fieldKey: string]: StatusField } = {};

                Object.entries(categoryFields).forEach(([fieldKey, oldField]) => {
                    if ((protocolData.phase === "1") || ((protocolData.phase === "2") && (oldField.phase === "2"))) {
                        emptyFields[fieldKey] = {
                            status: 'abweichung',
                            freitext: "",
                            phase: oldField.phase,
                            link: oldField.link,
                            klarname: oldField.klarname,
                        };
                    } else {
                        emptyFields[fieldKey] = oldField;
                    }
                });

                newData[categoryName] = emptyFields;
            });

            return {
                ...prev,
                data: newData,
                comment: '',
                date: ''
            };
        });
    };

    const exportAsJSON = async (generatePdf: boolean = false, sendEmail: boolean = false) => {
        try {
            console.log(JSON.stringify(protocolData, null, 2))
            const response = await fetch("/protocol/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    protocolData: protocolData,
                    generatePdf,
                    sendEmail,
                })
            })
            return await response.json();
        } catch (error) {
            console.error("Save failed ", error)
            throw error
        }

    }

    const ExportButtons = () => (<Group className="mb-20" justify="center">
            <Button radius="lg" variant="filled" onClick={() => exportAsJSON()}>Speichern</Button>
            <Button radius="lg" variant="filled" onClick={() => exportAsJSON(true)}>Speichern und PDF erstellen</Button>
            <Button radius="lg" variant="filled" onClick={() => exportAsJSON(true, true)}>Speichern, PDF erstellen und
                verschicken</Button>
            <Button radius="lg" variant="filled" color="red" onClick={emptyFields}>Eingaben löschen</Button>
        </Group>
    )

    useEffect(() => {
        const getData = async (id: string) => {
            const response = await fetch(`/protocol/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error("Couldnt get data from api " + response.statusText)
            }
            return response.json()
        }
        //TODO get id from somewhere
        getData("1").then(data => setProtocolData(data))
    }, [])

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
                    {Object.entries(protocolData.data)
                        .filter(([, categoryEntries]) => { //filter to order the categories alphabetically
                            if (protocolData.phase === "2") return true;
                            return Object.entries(categoryEntries).some(([, values]) =>
                                values.phase === "1"
                            );
                        })
                        .map(([categoryName, categoryEntries]) => (
                            <Protocol
                                onFieldUpdate={(fieldKey, newValue) => updateField(categoryName, fieldKey, newValue)}
                                hidePhase1={hidePhase1}
                                key={categoryName}
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
