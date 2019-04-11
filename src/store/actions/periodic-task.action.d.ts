import { Action } from "redux";
import { Area, PeriodicTask, WirelessSocket } from "../../models";

interface PeriodicTaskPayload {
    error: any;
    periodicTask: PeriodicTask;
}

export interface PeriodicTaskAction extends Action {
    payload: PeriodicTaskPayload;
}

interface PeriodicTaskAddPayload {
    areas: Area[];
    error: any;
    periodicTask: PeriodicTask;
    wirelessSockets: WirelessSocket[];
}

export interface PeriodicTaskAddAction extends Action {
    payload: PeriodicTaskAddPayload;
}

interface PeriodicTasksPayload {
    error: any;
    list: PeriodicTask[];
}

export interface PeriodicTasksAction extends Action {
    payload: PeriodicTasksPayload;
}
