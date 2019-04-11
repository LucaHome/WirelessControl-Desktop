import { Action } from "redux";
import { PeriodicTask } from "../../models";

interface PeriodicTaskPayload {
    error: any;
    periodicTask: PeriodicTask;
}

export interface PeriodicTaskAction extends Action {
    payload: PeriodicTaskPayload;
}

interface PeriodicTasksPayload {
    error: any;
    list: PeriodicTask[];
}

export interface PeriodicTasksAction extends Action {
    payload: PeriodicTasksPayload;
}
