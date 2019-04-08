import { PeriodicTask } from "../../models";
import { AppState } from "../models";

export const getPeriodicTasksForWirelessSocket = (state: AppState): PeriodicTask[] =>
    !!state.wirelessSocketSelected
        ? state.periodicTasks.filter((periodicTask) => periodicTask.wirelessSocketId === state.wirelessSocketSelected.id)
        : [];
