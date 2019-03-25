import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import { IAppProps } from "../props/IAppProps";
import Help from "./Help";
import Home from "./Home";

import "../../styles/main.scss";

export default class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
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
