import { WirelessSocket } from "../../models";
import { ADD_WIRELESS_SOCKET, DELETE_WIRELESS_SOCKET, LOAD_WIRELESS_SOCKETS, SELECT_WIRELESS_SOCKET, UPDATE_WIRELESS_SOCKET } from "../action-types";
import { WirelessSocketStore } from "../models";

const initialState: WirelessSocketStore = {
    wirelessSocketSelected: undefined,
    wirelessSockets: [],
};

export default function(state: WirelessSocketStore = initialState, action: any): WirelessSocketStore {
    switch (action.type) {
        case ADD_WIRELESS_SOCKET: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                wirelessSocketSelected: wirelessSocket,
                wirelessSockets: [...state.wirelessSockets, wirelessSocket],
            };
        }
        case DELETE_WIRELESS_SOCKET: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            const wirelessSockets = state.wirelessSockets;
            wirelessSockets.splice(wirelessSockets.indexOf(wirelessSocket), 1);
            let wirelessSocketSelected = state.wirelessSocketSelected;
            if (wirelessSocketSelected === wirelessSocket) {
                wirelessSocketSelected = wirelessSockets.length > 0 ? wirelessSockets[0] : undefined;
            }
            return {
                ...state,
                wirelessSocketSelected,
                wirelessSockets,
            };
        }
        case LOAD_WIRELESS_SOCKETS: {
            const wirelessSockets: WirelessSocket[] = action.payload.wirelessSockets;
            let wirelessSocketSelected = state.wirelessSocketSelected;
            if (!wirelessSocketSelected || wirelessSockets.filter((x: WirelessSocket) => x.id === wirelessSocketSelected.id).length === 0) {
                wirelessSocketSelected = wirelessSockets[0];
            }
            return {
                ...state,
                wirelessSocketSelected,
                wirelessSockets,
            };
        }
        case SELECT_WIRELESS_SOCKET: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            return {
                ...state,
                wirelessSocketSelected: wirelessSocket,
            };
        }
        case UPDATE_WIRELESS_SOCKET: {
            const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
            const wirelessSockets = state.wirelessSockets;
            const index = wirelessSockets.map((x: WirelessSocket) => x.id).indexOf(wirelessSocket.id);
            wirelessSockets[index] = wirelessSocket;
            return {
                ...state,
                wirelessSockets,
            };
        }
        default:
            return state;
    }
}
