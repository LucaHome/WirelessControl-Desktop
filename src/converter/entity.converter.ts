import { ApiResponse } from "../models";

export const convertNumberResponse = (jsonResponse: string): ApiResponse<number> => {
    const parsedResponse: ApiResponse<number> = JSON.parse(jsonResponse, (key: string, value: any) => {
        if (key === "data") {
            return Number(value);
        }

        return value;
    });
    return parsedResponse;
}