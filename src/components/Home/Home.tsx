import * as React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import { Entity } from "../../models/entity";
import Content from "../Content/Content";
import { IHomeProps } from "./IHomeProps";

import "../../../styles/main.scss";

export default class Home extends React.Component<IHomeProps, any> {

    private readonly list: Entity[] = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return <div>
            <Content drawerList={this.list} />
            <Jumbotron>
                <Link to="/help">Help</Link>
                <Link to="/loading">Loading</Link>
            </Jumbotron>
        </div>;
    }
}
