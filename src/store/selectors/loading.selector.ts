import { AppState } from "../models";

export const isAnythingLoading = (state: AppState) =>
    state.areaLoading
    || state.nextCloudCredentialsLoading
    || state.periodicTaskLoading
    || state.wirelessSocketLoading;
