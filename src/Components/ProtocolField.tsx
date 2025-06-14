import type {StatusField} from "../Types/Protocol.type.ts";
import {Anchor, Checkbox, Grid, Paper, Text, TextInput, Tooltip} from "@mantine/core";
import {IoMdInformationCircleOutline} from "react-icons/io";
import dayjs from "dayjs";

interface Props {
    name: string
    onUpdate: (newValue: StatusField) => void
    protocolData: StatusField
    phase: string
}

export function ProtocolField({name, onUpdate, protocolData, phase}: Props) {

    const updateField = (updates: Partial<StatusField>) => {
        const updatedValue: StatusField = {
            ...protocolData,
            ...updates,
            lastModifiedAt: new Date().toISOString(),
            modifiedBy: 'current_user'
        }
        onUpdate(updatedValue)
    }

    const isPhase1ItemInPhase2 = phase === "2" && protocolData.phase === "1"
    const isTextInputDisabled = (protocolData.status === "ok" || protocolData.status === "na") || isPhase1ItemInPhase2
    const inputStyles = {
        input: {borderColor: 'rgba(5,5,5,0.4)'}
    }

    return (
        <Paper withBorder p="xs" radius="lg" shadow="xs">
            <Grid align="center">
                <Grid.Col span={6}>
                    {protocolData.link ?
                        <Anchor href={protocolData.link} target={"_blank"} rel="noopener noreferrer">
                            {name}
                        </Anchor> :
                        <Text>{name}</Text>
                    }
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center">
                    <Checkbox
                        styles={inputStyles}
                        disabled={isPhase1ItemInPhase2}
                        checked={protocolData.status === "ok"}
                        onChange={() => updateField({
                            status: protocolData.status === "ok" ? "empty" : "ok",
                            freitext: ""
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center">
                    <Checkbox
                        styles={inputStyles}
                        disabled={isPhase1ItemInPhase2}
                        checked={protocolData.status === "na"}
                        onChange={() => updateField({
                            status: protocolData.status === "na" ? "empty" : "na",
                            freitext: ""
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={2} className="flex justify-center gap-2">
                    <TextInput
                        styles={inputStyles}
                        radius="md"
                        disabled={isTextInputDisabled}
                        onChange={(event) => updateField({freitext: event.currentTarget.value})}
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