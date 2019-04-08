import { Entity } from "./entity";

export interface Area extends Entity {
    name: string;
    filter: string;
    deletable: 0 | 1;
}
