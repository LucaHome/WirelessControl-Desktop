import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import Help from "./Help";
import Home from "./Home";

import "../../styles/main.scss";

export default class App extends React.Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <MemoryRouter>
            <Switch>
                <Route path="/help" component={Help} />
                <Route path="/" component={Home} />
            </Switch>
        </MemoryRouter>;
    }
}
