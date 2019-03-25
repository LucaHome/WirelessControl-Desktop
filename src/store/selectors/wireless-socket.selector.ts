export const getWirelessSocketState = (store: any) => store.wirelessSocketReducer;
export const getWirelessSocketList = (store: any) => getWirelessSocketState(store) ? getWirelessSocketState(store).wirelessSockets : [];
export const getSelectedWirelessSocket = (store: any) => getWirelessSocketState(store) ? getWirelessSocketState(store).wirelessSocketSelected : [];
