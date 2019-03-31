import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import * as Routes from "../../constants/routes.constants";
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
                <Route exact path={Routes.login} component={Login} />
                <Route path={Routes.loading} component={Loading} />
                <Route path={Routes.areas} component={Loading} />
                <Route path={Routes.areasEdit} component={Loading} />
                <Route path={Routes.wirelessSockets} component={Loading} />
                <Route path={Routes.wirelessSocketsEdit} component={Loading} />
                <Route path={Routes.periodicTasks} component={Loading} />
                <Route path={Routes.periodicTasksEdit} component={Loading} />
            </Switch>
        </MemoryRouter>;
    }
}
