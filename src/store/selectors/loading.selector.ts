import { AppState } from "../models";

export const isAnythingLoading = (state: AppState): boolean =>
    state.areaLoading
    || state.nextCloudCredentialsLoading
    || state.periodicTaskLoading
    || state.wirelessSocketLoading;
