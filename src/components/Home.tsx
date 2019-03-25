import * as React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

import "../../styles/main.scss";

export default class Home extends React.Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <div>
            <Jumbotron>
                <h1 className="display-3">Hello, Electron-React-Router!</h1>
                <p className="lead">This is an example for an Electron React Router Boilerplate.</p>
                <Link to="/help">More Info</Link>
            </Jumbotron>
        </div>;
    }
}
