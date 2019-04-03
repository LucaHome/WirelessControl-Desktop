import { PeriodicTask } from "../../models";
import {
    PERIODIC_TASK_ADD, PERIODIC_TASK_ADD_FAIL, PERIODIC_TASK_ADD_ON_SERVER, PERIODIC_TASK_ADD_SUCCESSFUL,
    PERIODIC_TASK_DELETE, PERIODIC_TASK_DELETE_FAIL, PERIODIC_TASK_DELETE_ON_SERVER, PERIODIC_TASK_DELETE_SUCCESSFUL,
    PERIODIC_TASK_SELECT, PERIODIC_TASK_SELECT_FAIL, PERIODIC_TASK_SELECT_SUCCESSFUL,
    PERIODIC_TASK_UPDATE, PERIODIC_TASK_UPDATE_FAIL, PERIODIC_TASK_UPDATE_ON_SERVER, PERIODIC_TASK_UPDATE_SUCCESSFUL,
    PERIODIC_TASKS_LOAD, PERIODIC_TASKS_LOAD_FAIL, PERIODIC_TASKS_LOAD_SUCCESSFUL,
} from "../action-types";
import { PeriodicTaskStore } from "../models";

const initialState: PeriodicTaskStore = {
    periodicTaskSelected: undefined,
    periodicTasks: [],
};

export default function(state: PeriodicTaskStore = initialState, action: any): PeriodicTaskStore {
    switch (action.type) {
        case PERIODIC_TASKS_LOAD: {
            // TODO make API call
            // const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
            };
        }
        case PERIODIC_TASKS_LOAD_FAIL: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASKS_LOAD_SUCCESSFUL: {
            const periodicTasks: PeriodicTask[] = action.payload.list;
            let periodicTaskSelected = state.periodicTaskSelected;
            if (!periodicTaskSelected || periodicTasks.filter((x: PeriodicTask) => x.id === periodicTaskSelected.id).length === 0) {
                periodicTaskSelected = periodicTasks[0];
            }
            return {
                ...state,
                periodicTaskSelected,
                periodicTasks,
            };
        }
        case PERIODIC_TASK_SELECT: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_SELECT_FAIL: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_SELECT_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
                periodicTaskSelected: periodicTask,
            };
        }
        case PERIODIC_TASK_ADD: {
            // TODO make API call
            // const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_ADD_FAIL: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_ADD_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
                periodicTaskSelected: periodicTask,
                periodicTasks: [...state.periodicTasks, periodicTask],
            };
        }
        case PERIODIC_TASK_UPDATE: {
            // TODO make API call
            // const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_UPDATE_FAIL: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_UPDATE_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            const periodicTasks = state.periodicTasks;
            const index = periodicTasks.map((x: PeriodicTask) => x.id).indexOf(periodicTask.id);
            periodicTasks[index] = periodicTask;
            return {
                ...state,
                periodicTasks,
            };
        }
        case PERIODIC_TASK_DELETE: {
            // TODO make API call
            // const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_DELETE_FAIL: {
            return {
                ...state,
            };
        }
        case PERIODIC_TASK_DELETE_SUCCESSFUL: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            const periodicTasks = state.periodicTasks;
            periodicTasks.splice(periodicTasks.indexOf(periodicTask), 1);
            let periodicTaskSelected = state.periodicTaskSelected;
            if (periodicTaskSelected === periodicTask) {
                periodicTaskSelected = periodicTasks.length > 0 ? periodicTasks[0] : undefined;
            }
            return {
                ...state,
                periodicTaskSelected,
                periodicTasks,
            };
        }
        default: {
            return state;
        }
    }
}
