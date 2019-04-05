import { NextCloudCredentials } from "../../models";

export interface ILoginProps {
    dispatch: Function;
    login: Function;
    nextCloudCredentials: NextCloudCredentials;
}
