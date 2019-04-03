export const getLoadingState = (store: any) => store.loadingReducer;
export const getLoadingArea = (store: any) => getLoadingState(store) ? getLoadingState(store).loadingArea : undefined;
export const getLoadingNextCloudCredentials = (store: any) => getLoadingState(store) ? getLoadingState(store).loadingNextCloudCredentials : undefined;
export const getLoadingPeriodicTask = (store: any) => getLoadingState(store) ? getLoadingState(store).loadingPeriodicTask : undefined;
export const getLoadingWirelessSocket = (store: any) => getLoadingState(store) ? getLoadingState(store).loadingWirelessSocket : undefined;
