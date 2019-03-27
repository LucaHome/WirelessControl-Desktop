import { PeriodicTask } from "../../models";
import {
    PERIODIC_TASK_ADD, PERIODIC_TASK_ADD_FAIL, PERIODIC_TASK_ADD_SUCCESSFUL,
    PERIODIC_TASK_DELETE, PERIODIC_TASK_DELETE_FAIL, PERIODIC_TASK_DELETE_SUCCESSFUL,
    PERIODIC_TASK_SELECT, PERIODIC_TASK_SELECT_FAIL, PERIODIC_TASK_SELECT_SUCCESSFUL,
    PERIODIC_TASK_UPDATE, PERIODIC_TASK_UPDATE_FAIL, PERIODIC_TASK_UPDATE_SUCCESSFUL,
    PERIODIC_TASKS_LOAD, PERIODIC_TASKS_LOAD_FAIL, PERIODIC_TASKS_LOAD_SUCCESSFUL,
} from "../action-types";

export const periodicTasksLoad = () => ({
    payload: {},
    type: PERIODIC_TASKS_LOAD,
});

export const periodicTasksLoadFail = (error: any) => ({
    payload: {
        error,
        list: undefined,
    },
    type: PERIODIC_TASKS_LOAD_FAIL,
});

export const periodicTasksLoadSuccessful = (list: PeriodicTask[]) => ({
    payload: {
        error: undefined,
        list,
    },
    type: PERIODIC_TASKS_LOAD_SUCCESSFUL,
});

export const periodicTaskSelect = () => ({
    payload: {},
    type: PERIODIC_TASK_SELECT,
});

export const periodicTaskSelectFail = (error: any) => ({
    payload: {
        error,
        periodicTask: undefined,
    },
    type: PERIODIC_TASK_SELECT_FAIL,
});

export const periodicTaskSelectSuccessful = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_SELECT_SUCCESSFUL,
});

export const periodicTaskAdd = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_ADD,
});

export const periodicTaskAddFail = (error: any) => ({
    payload: {
        error,
        periodicTask: undefined,
    },
    type: PERIODIC_TASK_ADD_FAIL,
});

export const periodicTaskAddSuccessful = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_ADD_SUCCESSFUL,
});

export const periodicTaskUpdate = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_UPDATE,
});

export const periodicTaskUpdateFail = (error: any) => ({
    payload: {
        error,
        periodicTask: undefined,
    },
    type: PERIODIC_TASK_UPDATE_FAIL,
});

export const periodicTaskUpdateSuccessful = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_UPDATE_SUCCESSFUL,
});

export const periodicTaskDelete = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_DELETE,
});

export const periodicTaskDeleteFail = (error: any) => ({
    payload: {
        error,
        periodicTask: undefined,
    },
    type: PERIODIC_TASK_DELETE_FAIL,
});

export const periodicTaskDeleteSuccessful = (periodicTask: PeriodicTask) => ({
    payload: {
        error: undefined,
        periodicTask,
    },
    type: PERIODIC_TASK_DELETE_SUCCESSFUL,
});
