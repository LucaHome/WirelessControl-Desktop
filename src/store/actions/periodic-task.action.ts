import { Area, PeriodicTask, WirelessSocket } from "../../models";
import {
    PERIODIC_TASK_ADD, PERIODIC_TASK_ADD_FAIL, PERIODIC_TASK_ADD_LOCAL, PERIODIC_TASK_ADD_ON_SERVER, PERIODIC_TASK_ADD_SUCCESSFUL,
    PERIODIC_TASK_DELETE, PERIODIC_TASK_DELETE_FAIL, PERIODIC_TASK_DELETE_ON_SERVER, PERIODIC_TASK_DELETE_SUCCESSFUL,
    PERIODIC_TASK_SELECT, PERIODIC_TASK_SELECT_FAIL, PERIODIC_TASK_SELECT_SUCCESSFUL,
    PERIODIC_TASK_UPDATE, PERIODIC_TASK_UPDATE_FAIL, PERIODIC_TASK_UPDATE_ON_SERVER, PERIODIC_TASK_UPDATE_SUCCESSFUL,
    PERIODIC_TASKS_LOAD, PERIODIC_TASKS_LOAD_FAIL, PERIODIC_TASKS_LOAD_SUCCESSFUL,
} from "../action-types";
import { PeriodicTaskAction, PeriodicTaskAddAction, PeriodicTasksAction } from "./periodic-task.action.d";

export const periodicTasksLoad = (): PeriodicTasksAction => ({
    payload: {
        error: null,
        list: null,
    },
    type: PERIODIC_TASKS_LOAD,
});

export const periodicTasksLoadFail = (error: any): PeriodicTasksAction => ({
    payload: {
        error,
        list: null,
    },
    type: PERIODIC_TASKS_LOAD_FAIL,
});

export const periodicTasksLoadSuccessful = (list: PeriodicTask[]): PeriodicTasksAction => ({
    payload: {
        error: null,
        list,
    },
    type: PERIODIC_TASKS_LOAD_SUCCESSFUL,
});

export const periodicTaskSelect = (): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask: null,
    },
    type: PERIODIC_TASK_SELECT,
});

export const periodicTaskSelectFail = (error: any): PeriodicTaskAction => ({
    payload: {
        error,
        periodicTask: null,
    },
    type: PERIODIC_TASK_SELECT_FAIL,
});

export const periodicTaskSelectSuccessful = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_SELECT_SUCCESSFUL,
});

export const periodicTaskAdd = (periodicTask: PeriodicTask, wirelessSockets: WirelessSocket[], areas: Area[]): PeriodicTaskAddAction => ({
    payload: {
        areas,
        error: null,
        periodicTask,
        wirelessSockets,
    },
    type: PERIODIC_TASK_ADD,
});

export const periodicTaskAddLocal = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_ADD_LOCAL,
});

export const periodicTaskAddOnServer = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_ADD_ON_SERVER,
});

export const periodicTaskAddFail = (error: any): PeriodicTaskAction => ({
    payload: {
        error,
        periodicTask: null,
    },
    type: PERIODIC_TASK_ADD_FAIL,
});

export const periodicTaskAddSuccessful = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_ADD_SUCCESSFUL,
});

export const periodicTaskUpdate = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_UPDATE,
});

export const periodicTaskUpdateOnServer = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_UPDATE_ON_SERVER,
});

export const periodicTaskUpdateFail = (error: any): PeriodicTaskAction => ({
    payload: {
        error,
        periodicTask: null,
    },
    type: PERIODIC_TASK_UPDATE_FAIL,
});

export const periodicTaskUpdateSuccessful = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_UPDATE_SUCCESSFUL,
});

export const periodicTaskDelete = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_DELETE,
});

export const periodicTaskDeleteOnServer = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_DELETE_ON_SERVER,
});

export const periodicTaskDeleteFail = (error: any): PeriodicTaskAction => ({
    payload: {
        error,
        periodicTask: null,
    },
    type: PERIODIC_TASK_DELETE_FAIL,
});

export const periodicTaskDeleteSuccessful = (periodicTask: PeriodicTask): PeriodicTaskAction => ({
    payload: {
        error: null,
        periodicTask,
    },
    type: PERIODIC_TASK_DELETE_SUCCESSFUL,
});
