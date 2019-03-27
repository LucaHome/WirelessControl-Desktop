export const getNextCloudCredentialsState = (store: any) => store.nextCloudCredentialsReducer;
export const getNextCloudCredentials = (store: any) => getNextCloudCredentialsState(store) ? getNextCloudCredentialsState(store).nextCloudCredentials : undefined;
