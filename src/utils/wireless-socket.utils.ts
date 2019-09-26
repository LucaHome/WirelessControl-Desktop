import { Area, WirelessSocket } from "../models";

export const lastToggledText = (wirelessSocket: WirelessSocket): string => {
    var date = new Date(0);
    date.setUTCSeconds(wirelessSocket.lastToggled);
    return date.toLocaleString();
}

export const validateArea = (wirelessSocket: WirelessSocket, areaList: Area[]): boolean =>
    wirelessSocket === undefined || (wirelessSocket.deletable === 0 || (wirelessSocket.area.length > 0 && !!areaList.find((area: Area) => area.filter === wirelessSocket.area)));

export const validateCode = (wirelessSocket: WirelessSocket): boolean =>
    wirelessSocket === undefined || (wirelessSocket.deletable === 0 || (wirelessSocket.code.length === 6 && new RegExp("^([01]{5}[ABCDE]{1})$").test(wirelessSocket.code)));

export const validateIcon = (wirelessSocket: WirelessSocket): boolean =>
    wirelessSocket === undefined || (wirelessSocket.deletable === 0 || wirelessSocket.icon.length > 0);

export const validateName = (wirelessSocket: WirelessSocket): boolean =>
    wirelessSocket === undefined || (wirelessSocket.deletable === 0 || (wirelessSocket.name.length >= 3 && wirelessSocket.name.length <= 128));
