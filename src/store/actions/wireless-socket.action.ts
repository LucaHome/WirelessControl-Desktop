import { WirelessSocket } from "../../models";
import {
    WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_ON_SERVER, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    WIRELESS_SOCKET_DELETE, WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_ON_SERVER, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    WIRELESS_SOCKET_SELECT, WIRELESS_SOCKET_SELECT_FAIL, WIRELESS_SOCKET_SELECT_SUCCESSFUL,
    WIRELESS_SOCKET_UPDATE, WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_ON_SERVER, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    WIRELESS_SOCKETS_LOAD, WIRELESS_SOCKETS_LOAD_FAIL, WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
} from "../action-types";

export const WirelessSocketsLoad = () => ({
    payload: {},
    type: WIRELESS_SOCKETS_LOAD,
});

export const WirelessSocketsLoadFail = (error: any) => ({
    payload: {
        error,
        list: undefined,
    },
    type: WIRELESS_SOCKETS_LOAD_FAIL,
});

export const WirelessSocketsLoadSuccessful = (list: WirelessSocket[]) => ({
    payload: {
        error: undefined,
        list,
    },
    type: WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
});

export const WirelessSocketSelect = () => ({
    payload: {},
    type: WIRELESS_SOCKET_SELECT,
});

export const WirelessSocketSelectFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_SELECT_FAIL,
});

export const WirelessSocketSelectSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_SELECT_SUCCESSFUL,
});

export const WirelessSocketAdd = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD,
});

export const WirelessSocketAddOnServer = () => ({
    payload: {},
    type: WIRELESS_SOCKET_ADD_ON_SERVER,
});

export const WirelessSocketAddFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_ADD_FAIL,
});

export const WirelessSocketAddSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_ADD_SUCCESSFUL,
});

export const WirelessSocketUpdate = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE,
});

export const WirelessSocketUpdateOnServer = () => ({
    payload: {},
    type: WIRELESS_SOCKET_UPDATE_ON_SERVER,
});

export const WirelessSocketUpdateFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_UPDATE_FAIL,
});

export const WirelessSocketUpdateSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
});

export const WirelessSocketDelete = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE,
});

export const WirelessSocketDeleteOnServer = () => ({
    payload: {},
    type: WIRELESS_SOCKET_DELETE_ON_SERVER,
});

export const WirelessSocketDeleteFail = (error: any) => ({
    payload: {
        error,
        wirelessSocket: undefined,
    },
    type: WIRELESS_SOCKET_DELETE_FAIL,
});

export const WirelessSocketDeleteSuccessful = (wirelessSocket: WirelessSocket) => ({
    payload: {
        error: undefined,
        wirelessSocket,
    },
    type: WIRELESS_SOCKET_DELETE_SUCCESSFUL,
});
