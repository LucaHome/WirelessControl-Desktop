import { ApiResponse, PeriodicTask } from "../models";

export const convertPeriodicTaskLoadResponse = (jsonResponse: string): ApiResponse<PeriodicTask[]> => {
    const parsedResponse: ApiResponse<PeriodicTask[]> = JSON.parse(jsonResponse, (key: string, value: any) => {
        if (key === "id" || key === "wirelessSocketId" || key === "wirelessSocketState" || key === "weekday"
            || key === "hour" || key === "minute" || key === "periodic" || key === "active") {
            return Number(value);
        }

        return value;
    });
    return parsedResponse;
}