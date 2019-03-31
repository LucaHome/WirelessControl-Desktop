import Store from "electron-store";
import { AppTheme } from "../enums";
import { NextCloudCredentials } from "../models";

const nextCloudCredentialsKey: string = "NextCloudCredentials";
const themeKey: string = "Theme";

export default class StorageService {
    public static saveNextCloudCredentials = (nextCloudCredentials: NextCloudCredentials): void => {
        const store = new Store();
        store.set(nextCloudCredentialsKey, JSON.stringify(nextCloudCredentials));
    }

    public static loadNextCloudCredentials = (): NextCloudCredentials => {
        const store = new Store();
        const nextCloudCredentialsJSON = store.get(nextCloudCredentialsKey);
        return !!nextCloudCredentialsJSON
            ? JSON.parse(nextCloudCredentialsJSON)
            : undefined;
    }

    public static saveAppTheme = (appTheme: AppTheme): void => {
        const store = new Store();
        store.set(themeKey, appTheme);
    }

    public static loadAppTheme = (): AppTheme => {
        const store = new Store();
        const appThemeJSON = store.get(themeKey);
        return !!appThemeJSON
            ? JSON.parse(appThemeJSON)
            : AppTheme.Light;
    }
}
