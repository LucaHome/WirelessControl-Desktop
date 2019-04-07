import { Area } from "../models";

export const clone = (area: Area): Area => {
    return {
        id: area.id,
        name: area.name,
        filter: area.filter,
        deletable: area.deletable,
    };
}
