import { Entity } from "./entity";

export interface PeriodicTask extends Entity {
    name: string;
    wirelessSocketId: number;
    wirelessSocketState: number;
    // The php server side counts from 1 - Monday to 7 - Sunday
    weekday: number;
    hour: number;
    minute: number;
    periodic: number;
    active: number;
}