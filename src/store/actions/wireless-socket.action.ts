import { Area, WirelessSocket } from "../../models";
import {
    WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_LOCAL, WIRELESS_SOCKET_ADD_ON_SERVER, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    WIRELESS_SOCKET_DELETE, WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_ON_SERVER, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    WIRELESS_SOCKET_SELECT, WIRELESS_SOCKET_SELECT_BY_ID, WIRELESS_SOCKET_SELECT_FAIL, WIRELESS_SOCKET_SELECT_SUCCESSFUL,
    WIRELESS_SOCKET_UPDATE, WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_ON_SERVER, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    WIRELESS_SOCKETS_LOAD, WIRELESS_SOCKETS_LOAD_FAIL, WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
} from "../action-types";
import { WirelessSocketAction, WirelessSocketAddAction, WirelessSocketIdAction, WirelessSocketsAction } from "./wireless-socket.action.d";

export const wirelessSocketsLoad = (): WirelessSocketsAction => ({
    payload: {
        error: undefined,
        list: undefined,
    },
    type: WIRELESS_SOCKETS_LOAD,
});

export const wirelessSocketsLoadFail = (error: any): WirelessSocketsAction => ({
    payload: {
        error,
        list: undefined,
    },
    type: WIRELESS_SOCKETS_LOAD_FAIL,
});

export const wirelessSocketsLoadSuccessful = (list: WirelessSocket[]): WirelessSocketsAction => ({
    payload: {
        error: undefined,
        list,
    },
    type: WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
});

export const wirelessSocketSelect = (): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_SELECT,
});

export const wirelessSocketSelectById = (id: number, list: WirelessSocket[]): WirelessSocketIdAction => ({
    payload: {
        error: undefined,
        id,
        list,
    },
    type: WIRELESS_SOCKET_SELECT_BY_ID,
});

export const wirelessSocketSelectFail = (error: any): WirelessSocketAction => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_SELECT_FAIL,
});

export const wirelessSocketSelectSuccessful = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_SELECT_SUCCESSFUL,
});

export const wirelessSocketAdd = (wirelessSocket: WirelessSocket, areas: Area[]): WirelessSocketAddAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
        areas,
    },
    type: WIRELESS_SOCKET_ADD,
});

export const wirelessSocketAddLocal = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_LOCAL,
});

export const wirelessSocketAddOnServer = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_ON_SERVER,
});

export const wirelessSocketAddFail = (error: any): WirelessSocketAction => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_ADD_FAIL,
});

export const wirelessSocketAddSuccessful = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_SUCCESSFUL,
});

export const wirelessSocketUpdate = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE,
});

export const wirelessSocketUpdateOnServer = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE_ON_SERVER,
});

export const wirelessSocketUpdateFail = (error: any): WirelessSocketAction => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_UPDATE_FAIL,
});

export const wirelessSocketUpdateSuccessful = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
});

export const wirelessSocketDelete = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE,
});

export const wirelessSocketDeleteOnServer = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE_ON_SERVER,
});

export const wirelessSocketDeleteFail = (error: any): WirelessSocketAction => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_DELETE_FAIL,
});

export const wirelessSocketDeleteSuccessful = (wirelessSocket: WirelessSocket): WirelessSocketAction => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE_SUCCESSFUL,
});
