import { Severity } from "../../enums";
import { Area, NextCloudCredentials, PeriodicTask, WirelessSocket } from "../../models";

// tslint:disable
export interface AppState {
    route: string;

    snackbarMessage: string;
    snackbarSeverity: Severity;

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
