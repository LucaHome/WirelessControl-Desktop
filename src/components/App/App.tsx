import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import { IAppProps } from "./IAppProps";

import "../../../styles/main.scss";

export default class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return <MemoryRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/loading" component={Loading} />
            </Switch>
        </MemoryRouter>;
    }
}
