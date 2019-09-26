import { PeriodicTask } from "../models";

export const getDateTimeString = (periodicTask: PeriodicTask): string =>
    `${weekdayArray[periodicTask.weekday - 1]}, ${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;

export const getTimeString = (periodicTask: PeriodicTask): string =>
    `${("0" + periodicTask.hour).slice(-2)}:${("0" + periodicTask.minute).slice(-2)}`;

export const validateName = (periodicTask: PeriodicTask): boolean =>
    periodicTask === undefined || (periodicTask.name.length >= 3 && periodicTask.name.length <= 128);

export const validateTime = (periodicTask: PeriodicTask): boolean =>
    periodicTask === undefined || (periodicTask.hour >= 0 && periodicTask.hour <= 23 && periodicTask.minute >= 0 && periodicTask.minute <= 59);

export const validateWeekday = (periodicTask: PeriodicTask): boolean =>
    periodicTask === undefined || periodicTask.weekday !== -1;

export const validateWirelessSocket = (periodicTask: PeriodicTask): boolean =>
    periodicTask === undefined || periodicTask.wirelessSocketId !== -1;

export const weekdayArray: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
