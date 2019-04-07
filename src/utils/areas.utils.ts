import { Area } from "../models";

export const clone = (area: Area): Area => {
    return {
        id: area.id,
        name: area.name,
        filter: area.filter,
        deletable: area.deletable,
    };
}

export const maxId = (areas: Area[]): number => {
    return Math.max(...areas.map(area => area.id));
}
