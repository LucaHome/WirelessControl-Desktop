import { PeriodicTask } from "../../models";
import { ADD_PERIODIC_TASK, DELETE_PERIODIC_TASK, LOAD_PERIODIC_TASKS, SELECT_PERIODIC_TASK, UPDATE_PERIODIC_TASK } from "../action-types";

export const addPeriodicTask = (periodicTask: PeriodicTask) => ({
    payload: {
        periodicTask,
    },
    type: ADD_PERIODIC_TASK,
});

export const deletePeriodicTask = (periodicTask: PeriodicTask) => ({
    payload: {
        periodicTask,
    },
    type: DELETE_PERIODIC_TASK,
});

export const loadPeriodicTask = () => ({
    payload: {},
    type: LOAD_PERIODIC_TASKS,
});

export const selectPeriodicTask = (periodicTask: PeriodicTask) => ({
    payload: {
        periodicTask,
    },
    type: SELECT_PERIODIC_TASK,
});

export const updatePeriodicTask = (periodicTask: PeriodicTask) => ({
    payload: {
        periodicTask,
    },
    type: UPDATE_PERIODIC_TASK,
});
