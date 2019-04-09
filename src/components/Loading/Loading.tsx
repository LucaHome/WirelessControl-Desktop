import * as React from "react";
import { Spinner } from "reactstrap";
import "../../../styles/main.scss";

export default class Loading extends React.Component {
    public render() {
        return <div className="wc-window-centered-display">
            <Spinner type="grow" color="primary" />
            Loading...
        </div>;
    }
}
