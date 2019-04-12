import { ApiResponse } from "../models";

export const convertPingResponse = (jsonResponse: string): ApiResponse<string> => {
    const parsedResponse: ApiResponse<string> = JSON.parse(jsonResponse);
    return parsedResponse;
}