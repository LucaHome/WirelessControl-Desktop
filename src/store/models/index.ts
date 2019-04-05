import { RouterState } from "connected-react-router";
import { Area, NextCloudCredentials, PeriodicTask, WirelessSocket } from "../../models";

export interface AppState {
    router: RouterState;
    theme: any;

    nextCloudCredentials: NextCloudCredentials;
    nextCloudCredentialsLoading: boolean;

    areas: Area[];
    areaSelected: Area;
    areaToBeAdded: Area;
    areaLoading: boolean;

    wirelessSockets: WirelessSocket[];
    wirelessSocketSelected: WirelessSocket;
    wirelessSocketToBeAdded: Area;
    wirelessSocketLoading: boolean;

    periodicTasks: PeriodicTask[];
    periodicTaskSelected: PeriodicTask;
    periodicTaskToBeAdded: PeriodicTask;
    periodicTaskLoading: boolean;
}
