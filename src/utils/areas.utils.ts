import { Area } from "../models";

export const clone = (area: Area): Area => {
    return {
        deletable: area.deletable,
        filter: area.filter,
        id: area.id,
        name: area.name,
    };
};

export const maxId = (areas: Area[]): number => {
    return Math.max(...areas.map((area) => area.id));
};
