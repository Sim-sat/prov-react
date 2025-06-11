import '@mantine/core/styles.css';
import './App.css'
import {Button, Group, MantineProvider, Stack, Textarea} from '@mantine/core';
import type {ProtocolType, StatusField} from "./Types/Protocol.type.ts";
import {Protocol} from "./Components/Protocol.tsx";
import '@mantine/dates/styles.css';
import {useState} from "react";
import {DateInput} from "@mantine/dates";

function App() {
    const testData: ProtocolType = {
        phase: "1",
        comment: '',
        date: "2025-06-10T14:30:00Z",
        data: new Map<string, Map<string, StatusField>>([

            // Maschine und Underlayfunktionen
            ['Maschine und Underlayfunktionen', new Map<string, StatusField>([
                ['mul_netzwerkverkabelung', {
                    status: 'ok',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T14:30:00Z',
                    modifiedBy: 'admin',
                    link: "https://ui.mantine.dev/category/tables/"
                }],
                ['mul_stromversorgung', {
                    status: 'na',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:32:00Z',
                    modifiedBy: 'admin',
                }],
                ['mul_cluster_ha', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:35:00Z',
                    modifiedBy: 'techniker',
                    link: "https://ui.mantine.dev/category/tables/"
                }],
                ['mul_wan', {
                    status: 'abweichung',
                    phase: '1',
                    freitext: 'DNS-Prüfung zeigt Verzögerungen von 200ms',
                    lastModifiedAt: '2025-06-10T14:40:00Z',
                    modifiedBy: 'admin'
                }],
                ['mul_systemzeit', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:42:00Z',
                    modifiedBy: 'techniker'
                }]
            ])],

            // Wartungszugriff
            ['Wartungszugriff', new Map<string, StatusField>([
                ['wz_management_tunnel', {
                    status: 'ok',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T15:00:00Z',
                    modifiedBy: 'admin'
                }],
                ['wz_management_interface', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T15:05:00Z',
                    modifiedBy: 'admin'
                }],
                ['wz_bgp_management', {
                    status: 'abweichung',
                    phase: '1',
                    freitext: 'Routing etabliert, aber nur 80% der erwarteten Präfixe empfangen',
                    lastModifiedAt: '2025-06-10T15:10:00Z',
                    modifiedBy: 'netzwerk_spezialist'
                }],
                ['ov_tunnel', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T15:15:00Z',
                    modifiedBy: 'admin'
                }],
                ['ov_bgp_ospf', {
                    status: 'na',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T15:18:00Z',
                    modifiedBy: 'admin'
                }]
            ])],

            // Standortkonfigurationen
            ['Standortkonfigurationen', new Map<string, StatusField>([
                ['sk_securityprofile', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:00:00Z',
                    modifiedBy: 'security_admin'
                }],
                ['sk_vpn_tunnel', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:05:00Z',
                    modifiedBy: 'admin'
                }],
                ['sk_vpn_einwahl', {
                    status: 'abweichung',
                    phase: '2',
                    freitext: 'Einwahl funktioniert, aber Zertifikat läuft in 30 Tagen ab',
                    lastModifiedAt: '2025-06-10T16:10:00Z',
                    modifiedBy: 'admin'
                }],
                ['sk_lan', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:15:00Z',
                    modifiedBy: 'techniker'
                }],
                ['sk_dmz_dnat', {
                    status: 'empty',
                    phase: '2'
                }]
            ])]
        ])
    }
    const testData2: ProtocolType = {
        phase: "2",
        comment: '',
        date: "2025-06-10T14:30:00Z",
        data: new Map<string, Map<string, StatusField>>([

            // Maschine und Underlayfunktionen
            ['Maschine und Underlayfunktionen', new Map<string, StatusField>([
                ['mul_netzwerkverkabelung', {
                    status: 'ok',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T14:30:00Z',
                    modifiedBy: 'admin',
                    link: "https://ui.mantine.dev/category/tables/"
                }],
                ['mul_stromversorgung', {
                    status: 'na',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:32:00Z',
                    modifiedBy: 'admin',
                }],
                ['mul_cluster_ha', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:35:00Z',
                    modifiedBy: 'techniker',
                    link: "https://ui.mantine.dev/category/tables/"
                }],
                ['mul_wan', {
                    status: 'abweichung',
                    phase: '1',
                    freitext: 'DNS-Prüfung zeigt Verzögerungen von 200ms',
                    lastModifiedAt: '2025-06-10T14:40:00Z',
                    modifiedBy: 'admin'
                }],
                ['mul_systemzeit', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T14:42:00Z',
                    modifiedBy: 'techniker'
                }]
            ])],

            // Wartungszugriff
            ['Wartungszugriff', new Map<string, StatusField>([
                ['wz_management_tunnel', {
                    status: 'ok',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T15:00:00Z',
                    modifiedBy: 'admin'
                }],
                ['wz_management_interface', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T15:05:00Z',
                    modifiedBy: 'admin'
                }],
                ['wz_bgp_management', {
                    status: 'abweichung',
                    phase: '1',
                    freitext: 'Routing etabliert, aber nur 80% der erwarteten Präfixe empfangen',
                    lastModifiedAt: '2025-06-10T15:10:00Z',
                    modifiedBy: 'netzwerk_spezialist'
                }],
                ['ov_tunnel', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T15:15:00Z',
                    modifiedBy: 'admin'
                }],
                ['ov_bgp_ospf', {
                    status: 'na',
                    phase: '1',
                    lastModifiedAt: '2025-06-10T15:18:00Z',
                    modifiedBy: 'admin'
                }]
            ])],

            // Standortkonfigurationen
            ['Standortkonfigurationen', new Map<string, StatusField>([
                ['sk_securityprofile', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:00:00Z',
                    modifiedBy: 'security_admin'
                }],
                ['sk_vpn_tunnel', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:05:00Z',
                    modifiedBy: 'admin'
                }],
                ['sk_vpn_einwahl', {
                    status: 'abweichung',
                    phase: '2',
                    freitext: 'Einwahl funktioniert, aber Zertifikat läuft in 30 Tagen ab',
                    lastModifiedAt: '2025-06-10T16:10:00Z',
                    modifiedBy: 'admin'
                }],
                ['sk_lan', {
                    status: 'ok',
                    phase: '2',
                    lastModifiedAt: '2025-06-10T16:15:00Z',
                    modifiedBy: 'techniker'
                }],
                ['sk_dmz_dnat', {
                    status: 'empty',
                    phase: '2'
                }]
            ])]
        ])
    }

    const [date, setDate] = useState<string | null>(testData.date);
    const [comment, setComment] = useState<string>(testData.comment);
    const [protocolData, setProtocolData] = useState<ProtocolType>(testData2);
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
                            link: oldField.link
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
        setDate("")
        setComment("")
    }

    const exportAsJSON = () => {
        const result = {
            phase: protocolData.phase,
            comment: comment,
            date: date,
            data: Object.fromEntries(
                [...protocolData.data.entries()].map(([key, fields]) =>
                    [key, Object.fromEntries([...fields.entries()])])
            )
        }
        console.log(JSON.stringify(result, null, 2))
    }

    return (
        <MantineProvider>
            <Stack align="center">
                <Stack className="w-full max-w-[1300px] p-10">
                    <p className="text-center mb-5 font-bold text-5xl">Abnahmeprotokoll Phase {protocolData.phase}</p>
                    <Stack gap="xs">
                        <p className="pl-2 font-bold">Datum</p>
                        <DateInput size="md" radius="lg" value={date} onChange={setDate}/>
                    </Stack>
                    <Stack gap="xs">
                        <p className="pl-2 font-bold">Kommentar</p>
                        <Textarea
                            radius="lg"
                            resize="vertical"
                            value={comment}
                            onChange={(event) => setComment(event.currentTarget.value)}
                        />
                    </Stack>
                    {protocolData.phase === "2" &&
                        <Button className="max-w-52" radius="lg" variant="filled"
                                onClick={() => setHidePhase1(!hidePhase1)}>Phase 1
                            verstecken</Button>}
                    {[...protocolData.data.entries()]
                        .filter(([categoryName, categoryEntries]) => {
                            if (protocolData.phase === "2") return true;
                            return [...categoryEntries.entries()].some(([fieldKey, values]) =>
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
                <Group className="mb-20" justify="center">
                    <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern</Button>
                    <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern und PDF erstellen</Button>
                    <Button radius="lg" variant="filled" onClick={exportAsJSON}>Speichern, PDF erstellen und
                        verschicken</Button>
                    <Button radius="lg" variant="filled" color="red" onClick={emptyFields}>Eingaben löschen</Button>
                </Group>
            </Stack>
        </MantineProvider>
    )
}

export default App
