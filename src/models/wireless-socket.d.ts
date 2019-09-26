import { Entity } from "./entity";

export interface WirelessSocket extends Entity {
    name: string;
    code: string;
    area: string;
    state: 0 | 1;
    description: string;
    icon: string;
    deletable: 0 | 1;
    lastToggled: number;
    group: string;
}
