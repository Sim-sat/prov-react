import type {StatusField} from "../Types/Protocol.type.ts";
import {ProtocolField} from "./ProtocolField.tsx";
import {Grid, Paper, Stack, Text} from "@mantine/core";

interface Props {
    entries: { [field: string]: StatusField };
    categoryName: string
    onFieldUpdate: (fieldKey: string, newValue: StatusField) => void
    phase: string
    hidePhase1: boolean
}

const ProtocolHeader = () => (
    <Paper withBorder p="xs" radius="lg" shadow="xs">
        <Grid align="center">
            <Grid.Col span={6}>
                <Text size="lg" fs="xl" fw="bold">Testcase</Text>
            </Grid.Col>
            <Grid.Col span={2} className="flex justify-center">
                <Text size="lg" fw="bold">Erfolgreich</Text>
            </Grid.Col>
            <Grid.Col span={2} className="flex justify-center">
                <Text size="lg" fw="bold">N/A</Text>
            </Grid.Col>
            <Grid.Col span={2} className="flex justify-center">
                <Text size="lg" fw="bold">Abweichung</Text>
            </Grid.Col>
        </Grid>
    </Paper>
)

export function Protocol({entries, categoryName, onFieldUpdate, phase, hidePhase1}: Props) {

    const showField = (fieldPhase: string) => (
        (phase === "1" && fieldPhase === "1")
        || (phase === "2" && (fieldPhase === "2" || (!hidePhase1))))

    return (
        <Stack w="100%" mt="xl">
            <p className="mb-5 font-bold text-3xl">{categoryName}</p>
            <ProtocolHeader/>
            <Stack justify="space-between">
                {Object.entries(entries).map(([fieldKey, values]) => (
                    ((showField(values.phase) && (
                            <ProtocolField
                                key={fieldKey}
                                protocolData={values}
                                phase={phase}
                                onUpdate={(newValue) => onFieldUpdate(fieldKey, newValue)}
                                name={values.klarname}
                            />
                        )
                    ))))}
            </Stack>
        </Stack>
    )

}