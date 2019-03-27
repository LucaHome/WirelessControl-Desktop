import { WirelessSocket } from "../../models";
import {
    WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    WIRELESS_SOCKET_DELETE, WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    WIRELESS_SOCKET_SELECT, WIRELESS_SOCKET_SELECT_FAIL, WIRELESS_SOCKET_SELECT_SUCCESSFUL,
    WIRELESS_SOCKET_UPDATE, WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    WIRELESS_SOCKETS_LOAD, WIRELESS_SOCKETS_LOAD_FAIL, WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
} from "../action-types";
import { WirelessSocketStore } from "../models";

const initialState: WirelessSocketStore = {
    loading: false,
    wirelessSocketSelected: undefined,
    wirelessSockets: [],
};

export default function(state: WirelessSocketStore = initialState, action: any): WirelessSocketStore {
    switch (action.type) {
        case WIRELESS_SOCKETS_LOAD: {
            // TODO make API call
            // const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                loading: true,
            };
        }
        case WIRELESS_SOCKETS_LOAD_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case WIRELESS_SOCKETS_LOAD_SUCCESSFUL: {
            const wirelessSockets: WirelessSocket[] = action.payload.list;
            let wirelessSocketSelected = state.wirelessSocketSelected;
            if (!wirelessSocketSelected || wirelessSockets.filter((x: WirelessSocket) => x.id === wirelessSocketSelected.id).length === 0) {
                wirelessSocketSelected = wirelessSockets[0];
            }
            return {
                ...state,
                loading: false,
                wirelessSocketSelected,
                wirelessSockets,
            };
        }
        case WIRELESS_SOCKET_SELECT: {
            return {
                ...state,
            };
        }
        case WIRELESS_SOCKET_SELECT_FAIL: {
            return {
                ...state,
            };
        }
        case WIRELESS_SOCKET_SELECT_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                wirelessSocketSelected: wirelessSocket,
            };
        }
        case WIRELESS_SOCKET_ADD: {
            // TODO make API call
            // const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                loading: true,
            };
        }
        case WIRELESS_SOCKET_ADD_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case WIRELESS_SOCKET_ADD_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                loading: false,
                wirelessSocketSelected: wirelessSocket,
                wirelessSockets: [...state.wirelessSockets, wirelessSocket],
            };
        }
        case WIRELESS_SOCKET_UPDATE: {
            // TODO make API call
            // const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                loading: true,
            };
        }
        case WIRELESS_SOCKET_UPDATE_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case WIRELESS_SOCKET_UPDATE_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            const wirelessSockets = state.wirelessSockets;
            const index = wirelessSockets.map((x: WirelessSocket) => x.id).indexOf(wirelessSocket.id);
            wirelessSockets[index] = wirelessSocket;
            return {
                ...state,
                loading: false,
                wirelessSockets,
            };
        }
        case WIRELESS_SOCKET_DELETE: {
            // TODO make API call
            // const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                loading: true,
            };
        }
        case WIRELESS_SOCKET_DELETE_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case WIRELESS_SOCKET_DELETE_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            const wirelessSockets = state.wirelessSockets;
            wirelessSockets.splice(wirelessSockets.indexOf(wirelessSocket), 1);
            let wirelessSocketSelected = state.wirelessSocketSelected;
            if (wirelessSocketSelected === wirelessSocket) {
                wirelessSocketSelected = wirelessSockets.length > 0 ? wirelessSockets[0] : undefined;
            }
            return {
                ...state,
                loading: false,
                wirelessSocketSelected,
                wirelessSockets,
            };
        }
        default: {
            return state;
        }
    }
}
