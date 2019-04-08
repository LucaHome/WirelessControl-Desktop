import { weekdayArray } from "../constants/periodic-tasks.constants";
import { PeriodicTask } from "../models";

export const clone = (periodicTask: PeriodicTask): PeriodicTask => {
    return {
        active: periodicTask.active,
        hour: periodicTask.hour,
        id: periodicTask.id,
        minute: periodicTask.minute,
        name: periodicTask.name,
        periodic: periodicTask.periodic,
        weekday: periodicTask.weekday,
        wirelessSocketId: periodicTask.wirelessSocketId,
        wirelessSocketState: periodicTask.wirelessSocketState,
    };
};

export const getDateTimeString = (periodicTask: PeriodicTask): string => {
    return `${weekdayArray[periodicTask.weekday - 1]}, ${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;
};

export const getTimeString = (periodicTask: PeriodicTask): string => {
    return `${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;
};

export const maxId = (periodicTasks: PeriodicTask[]): number => {
    return Math.max(...periodicTasks.map((periodicTask) => periodicTask.id));
};
