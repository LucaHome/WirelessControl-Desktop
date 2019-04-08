import {
    Avatar, List, ListItem, ListItemSecondaryAction, ListItemText, Switch,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { WirelessSocket } from "../../models";
import { wirelessSocketSelectSuccessful, wirelessSocketUpdate } from "../../store/actions";
import { getWirelessSocketsForArea } from "../../store/selectors";
import { IWirelessSocketsProps } from "./IWirelessSocketsProps";

class WirelessSockets extends React.Component<IWirelessSocketsProps, any> {

    constructor(props: IWirelessSocketsProps) {
        super(props);
    }

    public render() {
        const wirelessSockets: WirelessSocket[] = getWirelessSocketsForArea(this.props.state);
        if (!wirelessSockets.some((wirelessSocket) => this.props.state.wirelessSocketSelected !== null && wirelessSocket.id === this.props.state.wirelessSocketSelected.id)) {
            this.handleWirelessSocketSelect(wirelessSockets.length > 0 ? wirelessSockets[0] : null);
        }

        const wirelessSocketList = wirelessSockets.length > 0
            ? <List>
                {wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                    <ListItem button key={wirelessSocket.id} onClick={() => this.handleWirelessSocketSelect(wirelessSocket)} selected={this.isSelected(wirelessSocket)}>
                        <Avatar>
                            <i className={wirelessSocket.icon}></i>
                        </Avatar>
                        <ListItemText primary={wirelessSocket.name} secondary={wirelessSocket.code} />
                        <ListItemSecondaryAction>
                            <Switch onChange={() => this.handleToggle(wirelessSocket)} checked={wirelessSocket.state === 0} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        return <div>
            {wirelessSocketList}
        </div>;
    }

    private handleWirelessSocketSelect = (wirelessSocket: WirelessSocket): void => this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));
    private isSelected = (wirelessSocket: WirelessSocket): boolean => this.props.state.wirelessSocketSelected !== null && this.props.state.wirelessSocketSelected.id === wirelessSocket.id;
    private handleToggle = (wirelessSocket: WirelessSocket): void => {
        wirelessSocket.state = wirelessSocket.state === 0 ? 1 : 0;
        this.props.dispatch(wirelessSocketUpdate(wirelessSocket));
    }
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
