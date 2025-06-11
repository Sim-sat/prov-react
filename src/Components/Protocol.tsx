import type {StatusField} from "../Types/Protocol.type.ts";
import {ProtocolField} from "./ProtocolField.tsx";
import {Grid, Paper, Stack, Text} from "@mantine/core";


interface Props {
    entries: Map<string, StatusField>
    categoryName: string
    onFieldUpdate: (fieldKey: string, newValue: StatusField) => void
    phase: "1" | "2"
    hidePhase1: boolean
}


export function Protocol({entries, categoryName, onFieldUpdate, phase, hidePhase1}: Props) {

    return (
        <Stack className="w-full mt-10">
            <p className="mb-5 font-bold text-3xl">{categoryName}</p>
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
            <Stack justify="space-between">
                {[...entries.entries()].map(([fieldKey, values]) => (
                    ((((((phase === "1" && values.phase === "1"))) || (phase === "2" && (values.phase === "2") || (!hidePhase1))) && (
                            <ProtocolField
                                key={fieldKey}
                                protocolData={values}
                                phase={phase}
                                onUpdate={(newValue) => onFieldUpdate(fieldKey, newValue)}
                                name={fieldKey}
                            />
                        )
                    ))))}
            </Stack>
        </Stack>
    )

}