import Store from "electron-store";
import { storeEncryptionKey } from "../constants/keys.constants";
import { AppTheme } from "../enums";
import { NextCloudCredentials } from "../models";

const nextCloudCredentialsKey: string = "NextCloudCredentials";
const themeKey: string = "Theme";

const store = new Store();
store.encryptionKey = storeEncryptionKey;

export const saveNextCloudCredentialsInStore = (nextCloudCredentials: NextCloudCredentials): void => {
    store.set(nextCloudCredentialsKey, JSON.stringify(nextCloudCredentials));
};

export const loadNextCloudCredentialsFromStore = (): NextCloudCredentials => {
    const nextCloudCredentialsJSON = store.get(nextCloudCredentialsKey);
    return !!nextCloudCredentialsJSON
        ? JSON.parse(nextCloudCredentialsJSON)
        : undefined;
};

export const deleteNextCloudCredentialsInStore = (): void => {
    store.delete(nextCloudCredentialsKey);
};

export const saveAppThemeInStore = (appTheme: AppTheme): void => {
    store.set(themeKey, appTheme);
};

export const loadAppThemeFromStore = (): AppTheme => {
    const appThemeJSON = store.get(themeKey);
    return !!appThemeJSON
        ? JSON.parse(appThemeJSON)
        : AppTheme.Light;
};

export const deleteAppThemeInStore = (): void => {
    store.delete(themeKey);
};
