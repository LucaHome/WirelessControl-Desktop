import { WirelessSocket } from "../../models";
import {
    WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_ON_SERVER, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    WIRELESS_SOCKET_DELETE, WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_ON_SERVER, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    WIRELESS_SOCKET_SELECT, WIRELESS_SOCKET_SELECT_FAIL, WIRELESS_SOCKET_SELECT_SUCCESSFUL,
    WIRELESS_SOCKET_UPDATE, WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_ON_SERVER, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    WIRELESS_SOCKETS_LOAD, WIRELESS_SOCKETS_LOAD_FAIL, WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
} from "../action-types";

export const wirelessSocketsLoad = () => ({
    payload: {},
    type: WIRELESS_SOCKETS_LOAD,
});

export const wirelessSocketsLoadFail = (error: any) => ({
    payload: {
        error,
        list: undefined,
    },
    type: WIRELESS_SOCKETS_LOAD_FAIL,
});

export const wirelessSocketsLoadSuccessful = (list: WirelessSocket[]) => ({
    payload: {
        error: undefined,
        list,
    },
    type: WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
});

export const wirelessSocketSelect = () => ({
    payload: {},
    type: WIRELESS_SOCKET_SELECT,
});

export const wirelessSocketSelectFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_SELECT_FAIL,
});

export const wirelessSocketSelectSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_SELECT_SUCCESSFUL,
});

export const wirelessSocketAdd = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD,
});

export const wirelessSocketAddOnServer = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_ON_SERVER,
});

export const wirelessSocketAddFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_ADD_FAIL,
});

export const wirelessSocketAddSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_SUCCESSFUL,
});

export const wirelessSocketUpdate = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE,
});

export const wirelessSocketUpdateOnServer = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE_ON_SERVER,
});

export const wirelessSocketUpdateFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_UPDATE_FAIL,
});

export const wirelessSocketUpdateSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
});

export const wirelessSocketDelete = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE,
});

export const wirelessSocketDeleteOnServer = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE_ON_SERVER,
});

export const wirelessSocketDeleteFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_DELETE_FAIL,
});

export const wirelessSocketDeleteSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE_SUCCESSFUL,
});
