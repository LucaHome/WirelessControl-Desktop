import { SAVE_THEME } from "../action-types";
import { PreferenceAction } from "./preference.action.d";

export const saveTheme = (message: string): PreferenceAction => ({
    payload: {
        error: undefined,
        message,
    },
    type: SAVE_THEME,
});
