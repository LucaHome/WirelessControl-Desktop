import { ApiResponse, WirelessSocket } from "../models";

export const convertWirelessSocketLoadResponse = (jsonResponse: string): ApiResponse<WirelessSocket[]> => {
    const parsedResponse: ApiResponse<WirelessSocket[]> = JSON.parse(jsonResponse, (key: string, value: any) => {
        if (key === "id" || key === "state" || key === "deletable" || key === "lastToggled") {
            return Number(value);
        }

        return value;
    });
    return parsedResponse;
}