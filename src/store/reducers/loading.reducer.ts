import * as ActionTypes from "../action-types";
import { LoadingStore } from "../models";

const initialState: LoadingStore = {
    loadingArea: false,
    loadingNextCloudCredentials: false,
    loadingPeriodicTask: false,
    loadingWirelessSocket: false,
};

export default function(state: LoadingStore = initialState, action: any): LoadingStore {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
