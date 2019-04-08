import { WirelessSocket } from "../models";

export const clone = (wirelessSocket: WirelessSocket): WirelessSocket => {
    return {
        area: wirelessSocket.area,
        code: wirelessSocket.code,
        deletable: wirelessSocket.deletable,
        description: wirelessSocket.description,
        icon: wirelessSocket.icon,
        id: wirelessSocket.id,
        name: wirelessSocket.name,
        state: wirelessSocket.state,
    };
};

export const maxId = (wirelessSockets: WirelessSocket[]): number => {
    return Math.max(...wirelessSockets.map((wirelessSocket) => wirelessSocket.id));
};
