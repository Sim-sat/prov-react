export interface ProtocolType {
    date: string;
    comment: string;
    phase: string
    data: {
        [category: string]: {
            [field: string]: StatusField;
        };
    }
}

export interface StatusField {
    status: string
    klarname: string
    freitext: string;
    lastModifiedAt?: string;
    modifiedBy?: string;
    phase: string
    link?: string;
}