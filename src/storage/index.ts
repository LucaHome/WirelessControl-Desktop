import Store from "electron-store";
import { AppTheme } from "../enums";
import { NextCloudCredentials } from "../models";

export const nextCloudCredentialsKey: string = "NextCloudCredentials";
export const themeKey: string = "Theme";

export const saveNextCloudCredentials = (nextCloudCredentials: NextCloudCredentials): void => {
    const store = new Store();
    store.set(nextCloudCredentialsKey, JSON.stringify(nextCloudCredentials));
};

export const loadNextCloudCredentials = (): NextCloudCredentials => {
    const store = new Store();
    const nextCloudCredentialsJSON = store.get(nextCloudCredentialsKey);
    return !!nextCloudCredentialsJSON
        ? JSON.parse(nextCloudCredentialsJSON)
        : undefined;
};

export const saveAppTheme = (appTheme: AppTheme): void => {
    const store = new Store();
    store.set(themeKey, appTheme);
};

export const loadAppTheme = (): AppTheme => {
    const store = new Store();
    const appThemeJSON = store.get(themeKey);
    return !!appThemeJSON
        ? JSON.parse(appThemeJSON)
        : AppTheme.Light;
};
