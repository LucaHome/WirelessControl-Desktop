import * as React from "react";
import { INotFoundProps } from "./INotFoundProps";
import "./NotFound.css";

export default class NotFound extends React.Component<INotFoundProps, any> {

    constructor(props: INotFoundProps) {
        super(props);
    }

    public render() {
        return <div className="not-found">
            <h3>Sorry, page not found!</h3>
        </div>;
    }
}
