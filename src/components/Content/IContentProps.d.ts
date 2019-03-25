import { Entity } from "../../models/entity";

export interface IContentProps<T extends Entity> {
    classes: any;
    theme: any;
    drawerList: T[];
}