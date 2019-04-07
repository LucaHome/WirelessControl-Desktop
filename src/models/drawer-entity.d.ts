import { Entity } from "./entity";

export interface DrawerEntity extends Entity {
    title: string;
    icon: string;
    route: "/areas" | "/periodicTasks" | "/wirelessSockets";
    action: () => void;
}