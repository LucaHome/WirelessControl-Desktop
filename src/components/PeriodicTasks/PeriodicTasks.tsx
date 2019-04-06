import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { PeriodicTask } from "../../models";
import { periodicTaskSelectSuccessful } from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { IPeriodicTasksProps } from "./IPeriodicTasksProps";

class PeriodicTasks extends React.Component<IPeriodicTasksProps, any> {

    constructor(props: IPeriodicTasksProps) {
        super(props);
    }

    public render() {
        const periodicTasks: PeriodicTask[] = getPeriodicTasksForWirelessSocket(this.props.state);

        const periodicTaskList = periodicTasks.length > 0
            ? <List>
                {periodicTasks.map((periodicTask: PeriodicTask, _) => (
                    <ListItem button key={periodicTask.id} onClick={() => this.handlePeriodicTaskSelect(periodicTask)}>
                        <ListItemText primary={periodicTask.name} />
                    </ListItem>
                ))}
            </List>
            : <List></List>

        return <div>
            {periodicTaskList}
        </div>;
    }

    private handlePeriodicTaskSelect = (periodicTask: PeriodicTask) => this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));
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

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicTasks);
