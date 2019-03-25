import { Entity } from "./entity";

export interface WirelessSocket extends Entity {
    name: string;
    code: string;
    area: string;
    state: number;
    description: string;
    icon: string;
    deletable: number;
}