import { Area } from "../models";

export const validate = (area: Area): boolean =>
    area === undefined || (area.deletable === 0 || area.name.length > 0);
