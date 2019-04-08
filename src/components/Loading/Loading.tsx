import * as React from "react";
import { Spinner } from "reactstrap";
import { ILoadingProps } from "./ILoadingProps";
import "./Loading.css";

export default class Loading extends React.Component<ILoadingProps, any> {

    constructor(props: ILoadingProps) {
        super(props);
    }

    public render() {
        return <div className="centered-loading">
            <Spinner type="grow" color="primary" />
            Loading...
        </div>;
    }
}
