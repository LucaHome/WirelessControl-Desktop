import { ApiResponse, Area } from "../models";

export const convertAreaLoadResponse = (jsonResponse: string): ApiResponse<Area[]> => {
    const parsedResponse: ApiResponse<Area[]> = JSON.parse(jsonResponse, (key: string, value: any) => {
        if (key === "id" || key === "deletable") {
            return Number(value);
        }

        return value;
    });
    return parsedResponse;
}