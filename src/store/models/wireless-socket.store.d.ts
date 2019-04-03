import { WirelessSocket } from "../../models/wireless-socket";

export interface WirelessSocketStore {
    wirelessSockets: WirelessSocket[];
    wirelessSocketSelected: WirelessSocket;
}