import { weekdayArray } from "../constants/periodic-tasks.constants";
import { PeriodicTask } from "../models";

export const getDateTimeString = (periodicTask: PeriodicTask): string => {
    return `${weekdayArray[periodicTask.weekday - 1]}, ${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;
};

export const getTimeString = (periodicTask: PeriodicTask): string => {
    return `${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;
};
