import { Action } from "redux";
import { Area, WirelessSocket } from "../../models";

interface WirelessSocketPayload {
    error: any;
    wirelessSocket: WirelessSocket;
}

export interface WirelessSocketAction extends Action {
    payload: WirelessSocketPayload;
}

interface WirelessSocketsPayload {
    error: any;
    list: WirelessSocket[];
}

export interface WirelessSocketsAction extends Action {
    payload: WirelessSocketsPayload;
}

interface WirelessSocketAddPayload {
    error: any;
    wirelessSocket: WirelessSocket;
    areas: Area[];
}

export interface WirelessSocketAddAction extends Action {
    payload: WirelessSocketAddPayload;
}

interface WirelessSocketIdPayload {
    error: any;
    id: number;
    list: WirelessSocket[];
}

export interface WirelessSocketIdAction extends Action {
    payload: WirelessSocketIdPayload;
}
