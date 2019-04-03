import * as React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import Content from "../Content/Content";
import { IHomeProps } from "./IHomeProps";

export default class Home extends React.Component<IHomeProps, any> {

    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return <div>
            <Content />
            <Jumbotron>
                <Link to="/loading">Loading</Link>
            </Jumbotron>
        </div>;
    }
}
