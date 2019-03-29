import { Entity } from "./entity";

export interface DrawerEntity extends Entity {
    title: string;
    icon: string;
    iconColor: "inherit" | "default" | "disabled" | "primary" | "secondary" | "error" | "action";
    action: () => void;
}