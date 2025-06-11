export interface ProtocolType {
    date: string;
    comment: string;
    phase: "1" | "2";
    data: Map<string, Map<string, StatusField>>
}

export interface StatusField {
    status: 'ok' | 'na' | 'empty' | 'abweichung'
    freitext?: string;
    lastModifiedAt?: string;
    modifiedBy?: string;
    phase: "1" | "2";
    link?: string;
}