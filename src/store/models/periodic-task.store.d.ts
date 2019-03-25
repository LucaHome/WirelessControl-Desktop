import { PeriodicTask } from "../../models/periodic-task";

export interface PeriodicTaskStore {
    periodicTasks: PeriodicTask[];
    periodicTaskSelected: PeriodicTask;
}