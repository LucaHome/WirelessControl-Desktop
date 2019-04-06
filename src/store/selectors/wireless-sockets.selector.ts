import { WirelessSocket } from "../../models";
import { AppState } from "../models";

export const getWirelessSocketsForArea = (state: AppState): WirelessSocket[] =>
    !!state.areaSelected
        ? state.areaSelected.filter === ""
            ? state.wirelessSockets
            : state.wirelessSockets.filter(wirelessSocket => wirelessSocket.area === state.areaSelected.filter)
        : [];
