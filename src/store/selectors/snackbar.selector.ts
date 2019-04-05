import { Severity } from "../../enums";
import { AppState } from "../models";

export const snackbarContent = (state: AppState): any => {
    return {
        display: state.snackbarSeverity !== Severity.Null && state.snackbarMessage !== "",
        message: state.snackbarMessage,
        severity: state.snackbarSeverity,
    };
};
