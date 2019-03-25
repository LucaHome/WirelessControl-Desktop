import { WirelessSocket } from "../../models";
import { ADD_WIRELESS_SOCKET, DELETE_WIRELESS_SOCKET, LOAD_WIRELESS_SOCKETS, SELECT_WIRELESS_SOCKET, UPDATE_WIRELESS_SOCKET } from "../action-types";

export const addWirelessSocket = (wirelessSocket: WirelessSocket) => ({
    payload: {
        wirelessSocket,
    },
    type: ADD_WIRELESS_SOCKET,
});

export const deleteWirelessSocket = (wirelessSocket: WirelessSocket) => ({
    payload: {
        wirelessSocket,
    },
    type: DELETE_WIRELESS_SOCKET,
});

export const loadWirelessSocket = () => ({
    payload: {},
    type: LOAD_WIRELESS_SOCKETS,
});

export const selectWirelessSocket = (wirelessSocket: WirelessSocket) => ({
    payload: {
        wirelessSocket,
    },
    type: SELECT_WIRELESS_SOCKET,
});

export const updateWirelessSocket = (wirelessSocket: WirelessSocket) => ({
    payload: {
        wirelessSocket,
    },
    type: UPDATE_WIRELESS_SOCKET,
});
