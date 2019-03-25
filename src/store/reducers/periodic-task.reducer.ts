import { PeriodicTask } from "../../models";
import { ADD_PERIODIC_TASK, DELETE_PERIODIC_TASK, LOAD_PERIODIC_TASKS, SELECT_PERIODIC_TASK, UPDATE_PERIODIC_TASK } from "../action-types";
import { PeriodicTaskStore } from "../models";

const initialState: PeriodicTaskStore = {
    periodicTaskSelected: undefined,
    periodicTasks: [],
};

export default function(state: PeriodicTaskStore = initialState, action: any): PeriodicTaskStore {
    switch (action.type) {
        case ADD_PERIODIC_TASK: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
                periodicTaskSelected: periodicTask,
                periodicTasks: [...state.periodicTasks, periodicTask],
            };
        }
        case DELETE_PERIODIC_TASK: {
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
        case LOAD_PERIODIC_TASKS: {
            const periodicTasks: PeriodicTask[] = action.payload.periodicTasks;
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
        case SELECT_PERIODIC_TASK: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            return {
                ...state,
                periodicTaskSelected: periodicTask,
            };
        }
        case UPDATE_PERIODIC_TASK: {
            const periodicTask: PeriodicTask = action.payload.periodicTask;
            const periodicTasks = state.periodicTasks;
            const index = periodicTasks.map((x: PeriodicTask) => x.id).indexOf(periodicTask.id);
            periodicTasks[index] = periodicTask;
            return {
                ...state,
                periodicTasks,
            };
        }
        default:
            return state;
    }
}
