import Store from "electron-store";
import { AppTheme } from "../enums";
import { NextCloudCredentials } from "../models";

const nextCloudCredentialsKey: string = "NextCloudCredentials";

const storeEncryptionKey: string = "j389cj34-23.1=p1";

const themeKey: string = "Theme";

const store: Store<any> = new Store();
store["encryptionKey"] = storeEncryptionKey;

export const deleteAppThemeInStore = (): void => {
    store.delete(themeKey);
};

export const deleteNextCloudCredentialsInStore = (): void => {
    store.delete(nextCloudCredentialsKey);
};

export const loadAppThemeFromStore = (): AppTheme => {
    const appTheme = store.get(themeKey);
    return !!appTheme
        ? appTheme
        : AppTheme.Light;
};

export const loadNextCloudCredentialsFromStore = (): NextCloudCredentials => {
    const nextCloudCredentialsJSON = store.get(nextCloudCredentialsKey, "");
    return !!nextCloudCredentialsJSON
        ? JSON.parse(nextCloudCredentialsJSON)
        : undefined;
};

export const saveAppThemeInStore = (appTheme: AppTheme): void => {
    store.set(themeKey, appTheme);
};

export const saveNextCloudCredentialsInStore = (nextCloudCredentials: NextCloudCredentials): void => {
    store.set(nextCloudCredentialsKey, JSON.stringify(nextCloudCredentials));
};
