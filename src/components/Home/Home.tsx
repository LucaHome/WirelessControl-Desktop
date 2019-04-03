import * as React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import { DrawerEntity } from "../../models/drawer-entity";
import Content from "../Content/Content";
import { IHomeProps } from "./IHomeProps";

import "../../../styles/main.scss";

export default class Home extends React.Component<IHomeProps, any> {

    private readonly list: DrawerEntity[] = [
        { id: 0, title: "Areas", icon: "map", iconColor: "primary", action: () => { const a = 0; } },
        { id: 1, title: "WirelessSockets", icon: "wifi_tethering", iconColor: "primary", action: () => { const a = 0; } },
        { id: 2, title: "PeriodicTasks", icon: "alarm", iconColor: "primary", action: () => { const a = 0; } },
    ];

    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return <div>
            <Content drawerList={this.list} />
            <Jumbotron>
                <Link to="/loading">Loading</Link>
            </Jumbotron>
        </div>;
    }
}
