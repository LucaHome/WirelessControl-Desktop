import { Entity } from "../models";

export interface IEntityProps<T extends Entity> {
    classes: any;
    dispatch: Function;
    state: any;
}
