import { Area } from "../../models/area";

export interface AreaStore {
    areas: Area[];
    areaSelected: Area;
    loading: boolean;
}