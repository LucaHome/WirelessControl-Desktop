import { Action } from "redux";
import { WirelessSocket } from "../../models";

interface WirelessSocketPayload {
    error: any,
    wirelessSocket: WirelessSocket;
}

export interface WirelessSocketAction extends Action {
    payload: WirelessSocketPayload;
}

interface WirelessSocketsPayload {
    error: any,
    list: WirelessSocket[];
}

export interface WirelessSocketsAction extends Action {
    payload: WirelessSocketsPayload;
}
