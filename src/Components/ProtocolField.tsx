import type {StatusField} from "../Types/Protocol.type.ts";
import {Anchor, Checkbox, Grid, Paper, Text, TextInput, Tooltip} from "@mantine/core";
import {KLARNAME} from "../Klarnamen.ts";
import {IoMdInformationCircleOutline} from "react-icons/io";
import dayjs from "dayjs";

interface Props {
    name: string
    onUpdate: (newValue: StatusField) => void
    protocolData: StatusField
    phase: "1" | "2"
}

export function ProtocolField({name, onUpdate, protocolData, phase}: Props) {

    const handleStatusChange = (newStatus: "ok" | "na") => {
        const updatedValue: StatusField = {
            ...protocolData,
            status: protocolData.status === newStatus ? "empty" : newStatus,
            lastModifiedAt: new Date().toISOString(),
            modifiedBy: 'current_user',
            freitext: ""
        }
        onUpdate(updatedValue)
    }
    const handleFreitextChange = (text: string) => {
        const updatedValue: StatusField = {
            ...protocolData,
            status: "empty",
            freitext: text,
            lastModifiedAt: new Date().toISOString(),
            modifiedBy: 'current_user'
        }
        onUpdate(updatedValue)
    }

    return (
        <Paper withBorder p="xs" radius="lg" shadow="xs">
            <Grid align="center">
                <Grid.Col span={6}>
                    {protocolData.link ?
                        <Anchor href={protocolData.link} target={"_blank"} rel="noopener noreferrer">
                            {KLARNAME[name] || name}
                        </Anchor> :
                        <Text>{KLARNAME[name] || name}</Text>
                    }
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center">
                    <Checkbox
                        styles={{
                            input: {
                                borderColor: 'rgba(5,5,5,0.4)',
                            }
                        }}
                        disabled={phase === "2" && protocolData.phase === "1"}
                        checked={protocolData.status === "ok"}
                        onChange={() => handleStatusChange("ok")}
                    />
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center">
                    <Checkbox
                        styles={{
                            input: {
                                borderColor: 'rgba(5,5,5,0.4)',
                            }
                        }}
                        disabled={phase === "2" && protocolData.phase === "1"}

                        checked={protocolData.status === "na"}
                        onChange={() => handleStatusChange("na")}
                    />
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center gap-2">
                    <TextInput
                        styles={{
                            input: {
                                borderColor: 'rgba(5,5,5,0.4)',
                            },
                        }}
                        radius="md"
                        disabled={(
                                protocolData.status === "na" || protocolData.status === "ok") ||
                            (phase === "2" && protocolData.phase === "1")}
                        onChange={(event) => handleFreitextChange(event.currentTarget.value)}
                        value={protocolData.freitext}
                    />
                    <Tooltip
                        label={
                            <span>Zuletzt bearbeitet am <strong> {dayjs(protocolData.lastModifiedAt).format("DD.MM.YYYY HH:mm:ss")} </strong> von <strong> {protocolData.modifiedBy} </strong> </span>}>
                        <IoMdInformationCircleOutline size={22}/>
                    </Tooltip>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}