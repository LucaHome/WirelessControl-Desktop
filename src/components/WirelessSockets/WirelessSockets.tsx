import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { WirelessSocket } from "../../models";
import { wirelessSocketSelectSuccessful } from "../../store/actions";
import { getWirelessSocketsForArea } from "../../store/selectors";
import { IWirelessSocketsProps } from "./IWirelessSocketsProps";

class WirelessSockets extends React.Component<IWirelessSocketsProps, any> {

    constructor(props: IWirelessSocketsProps) {
        super(props);
    }

    public render() {
        const wirelessSockets: WirelessSocket[] = getWirelessSocketsForArea(this.props.state);

        const wirelessSocketList = wirelessSockets.length > 0
            ? <List>
                {wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                    <ListItem button key={wirelessSocket.id} onClick={() => this.handleWirelessSocketSelect(wirelessSocket)}>
                        <ListItemText primary={wirelessSocket.name} />
                    </ListItem>
                ))}
            </List>
            : <List></List>

        return <div>
            {wirelessSocketList}
        </div>;
    }

    private handleWirelessSocketSelect = (wirelessSocket: WirelessSocket) => this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));
}

const mapStateToProps = (state) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WirelessSockets);
