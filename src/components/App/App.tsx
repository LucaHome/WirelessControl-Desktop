import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
// import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import { IAppProps } from "./IAppProps";

import "../../../styles/main.scss";

export default class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return <MemoryRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/areas" component={Loading} />
                <Route path="/areas-edit" component={Loading} />
                <Route path="/wireless-sockets" component={Loading} />
                <Route path="/wireless-sockets-edit" component={Loading} />
                <Route path="/periodic-tasks" component={Loading} />
                <Route path="/periodic-tasks-edit" component={Loading} />
                <Route path="/loading" component={Loading} />
            </Switch>
        </MemoryRouter>;
    }
}
