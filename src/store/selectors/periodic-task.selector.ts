export const getPeriodicTaskState = (store: any) => store.periodicTaskReducer;
export const getPeriodicTaskList = (store: any) => getPeriodicTaskState(store) ? getPeriodicTaskState(store).periodicTasks : [];
export const getSelectedPeriodicTask = (store: any) => getPeriodicTaskState(store) ? getPeriodicTaskState(store).periodicTaskSelected : undefined;
