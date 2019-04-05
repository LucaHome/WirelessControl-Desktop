import { PeriodicTask } from "../../models";
import {
    PERIODIC_TASK_ADD, PERIODIC_TASK_ADD_FAIL, PERIODIC_TASK_ADD_ON_SERVER, PERIODIC_TASK_ADD_SUCCESSFUL,
    /*PERIODIC_TASK_DELETE,*/ PERIODIC_TASK_DELETE_FAIL, PERIODIC_TASK_DELETE_ON_SERVER, PERIODIC_TASK_DELETE_SUCCESSFUL,
    /*PERIODIC_TASK_SELECT,*/ /*PERIODIC_TASK_SELECT_FAIL,*/ PERIODIC_TASK_SELECT_SUCCESSFUL,
    /*PERIODIC_TASK_UPDATE,*/ PERIODIC_TASK_UPDATE_FAIL, PERIODIC_TASK_UPDATE_ON_SERVER, PERIODIC_TASK_UPDATE_SUCCESSFUL,
    PERIODIC_TASKS_LOAD, PERIODIC_TASKS_LOAD_FAIL, PERIODIC_TASKS_LOAD_SUCCESSFUL,
} from "../action-types";

const periodicTasksReducer = (periodicTasks: PeriodicTask[], action: any): PeriodicTask[] => {
    switch (action.type) {
        case PERIODIC_TASKS_LOAD_SUCCESSFUL: {
            return action.payload.periodicTasks;
        }
        case PERIODIC_TASK_ADD_SUCCESSFUL: {
            return [...periodicTasks, action.payload.area];
        }
        case PERIODIC_TASK_UPDATE_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            const index = periodicTasks.map((x: PeriodicTask) => x.id).indexOf(periodicTask.id);
            periodicTasks[index] = periodicTask;
            return periodicTasks;
        }
        case PERIODIC_TASK_DELETE_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            periodicTasks.splice(periodicTasks.indexOf(periodicTask), 1);
            return periodicTasks;
        }
        default:
            return periodicTasks;
    }
}

const periodicTaskSelectReducer = (periodicTask: PeriodicTask, action: any): PeriodicTask => {
    switch (action.type) {
        case PERIODIC_TASK_SELECT_SUCCESSFUL:
            return action.payload.area;
        default:
            return periodicTask;
    }
}

const periodicTaskAddReducer = (periodicTask: PeriodicTask, action: any): PeriodicTask => {
    switch (action.type) {
        case PERIODIC_TASK_ADD: {
            return action.payload.periodicTask;
        }
        case PERIODIC_TASK_ADD_SUCCESSFUL:
        case PERIODIC_TASK_ADD_FAIL:
            return undefined;
        default:
            return periodicTask;
    }
}

const periodicTaskLoadingReducer = (periodicTaskLoading: boolean, action: any): boolean => {
    switch (action.type) {
        case PERIODIC_TASKS_LOAD:
        case PERIODIC_TASK_ADD_ON_SERVER:
        case PERIODIC_TASK_UPDATE_ON_SERVER:
        case PERIODIC_TASK_DELETE_ON_SERVER:
            return true;
        case PERIODIC_TASKS_LOAD_SUCCESSFUL:
        case PERIODIC_TASKS_LOAD_FAIL:
        case PERIODIC_TASK_ADD_SUCCESSFUL:
        case PERIODIC_TASK_ADD_FAIL:
        case PERIODIC_TASK_UPDATE_SUCCESSFUL:
        case PERIODIC_TASK_UPDATE_FAIL:
        case PERIODIC_TASK_DELETE_SUCCESSFUL:
        case PERIODIC_TASK_DELETE_FAIL:
            return false;
        default:
            return periodicTaskLoading;
    }
}

export default {
    periodicTaskAddReducer,
    periodicTaskLoadingReducer,
    periodicTaskSelectReducer,
    periodicTasksReducer,
}
