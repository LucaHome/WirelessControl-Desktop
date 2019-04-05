import { WirelessSocket } from "../../models";
import {
    WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_ON_SERVER, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    /*WIRELESS_SOCKET_DELETE,*/ WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_ON_SERVER, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    /*WIRELESS_SOCKET_SELECT,*/ /*WIRELESS_SOCKET_SELECT_FAIL,*/ WIRELESS_SOCKET_SELECT_SUCCESSFUL,
    /*WIRELESS_SOCKET_UPDATE,*/ WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_ON_SERVER, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    WIRELESS_SOCKETS_LOAD, WIRELESS_SOCKETS_LOAD_FAIL, WIRELESS_SOCKETS_LOAD_SUCCESSFUL,
} from "../action-types";

const wirelessSocketsReducer = (wirelessSockets: WirelessSocket[], action: any): WirelessSocket[] => {
    switch (action.type) {
        case WIRELESS_SOCKETS_LOAD_SUCCESSFUL: {
            return action.payload.wirelessSockets;
        }
        case WIRELESS_SOCKET_ADD_SUCCESSFUL: {
            return [...wirelessSockets, action.payload.area];
        }
        case WIRELESS_SOCKET_UPDATE_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            const index = wirelessSockets.map((x: WirelessSocket) => x.id).indexOf(wirelessSocket.id);
            wirelessSockets[index] = wirelessSocket;
            return wirelessSockets;
        }
        case WIRELESS_SOCKET_DELETE_SUCCESSFUL: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            wirelessSockets.splice(wirelessSockets.indexOf(wirelessSocket), 1);
            return wirelessSockets;
        }
        default:
            return wirelessSockets;
    }
}

const wirelessSocketSelectReducer = (wirelessSocket: WirelessSocket, action: any): WirelessSocket => {
    switch (action.type) {
        case WIRELESS_SOCKET_SELECT_SUCCESSFUL:
            return action.payload.area;
        default:
            return wirelessSocket;
    }
}

const wirelessSocketAddReducer = (wirelessSocket: WirelessSocket, action: any): WirelessSocket => {
    switch (action.type) {
        case WIRELESS_SOCKET_ADD: {
            return action.payload.wirelessSocket;
        }
        case WIRELESS_SOCKET_ADD_SUCCESSFUL:
        case WIRELESS_SOCKET_ADD_FAIL:
            return undefined;
        default:
            return wirelessSocket;
    }
}

const wirelessSocketLoadingReducer = (wirelessSocketLoading: boolean, action: any): boolean => {
    switch (action.type) {
        case WIRELESS_SOCKETS_LOAD:
        case WIRELESS_SOCKET_ADD_ON_SERVER:
        case WIRELESS_SOCKET_UPDATE_ON_SERVER:
        case WIRELESS_SOCKET_DELETE_ON_SERVER:
            return true;
        case WIRELESS_SOCKETS_LOAD_SUCCESSFUL:
        case WIRELESS_SOCKETS_LOAD_FAIL:
        case WIRELESS_SOCKET_ADD_SUCCESSFUL:
        case WIRELESS_SOCKET_ADD_FAIL:
        case WIRELESS_SOCKET_UPDATE_SUCCESSFUL:
        case WIRELESS_SOCKET_UPDATE_FAIL:
        case WIRELESS_SOCKET_DELETE_SUCCESSFUL:
        case WIRELESS_SOCKET_DELETE_FAIL:
            return false;
        default:
            return wirelessSocketLoading;
    }
}

export default {
    wirelessSocketAddReducer,
    wirelessSocketLoadingReducer,
    wirelessSocketSelectReducer,
    wirelessSocketsReducer,
}
