import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { PeriodicTask } from "../../models";
import { periodicTaskSelectSuccessful } from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { getDateTimeString } from "../../utils/periodic-tasks.utils";
import { IPeriodicTasksProps } from "./IPeriodicTasksProps";

class PeriodicTasks extends React.Component<IPeriodicTasksProps, any> {

    constructor(props: IPeriodicTasksProps) {
        super(props);
    }

    public render() {
        const periodicTasks: PeriodicTask[] = getPeriodicTasksForWirelessSocket(this.props.state);
        if (!periodicTasks.some(periodicTask => this.props.state.periodicTaskSelected !== null && periodicTask.id === this.props.state.periodicTaskSelected.id)) {
            this.handlePeriodicTaskSelect(periodicTasks.length > 0 ? periodicTasks[0] : null);
        }

        const periodicTaskList = periodicTasks.length > 0
            ? <List>
                {periodicTasks.map((periodicTask: PeriodicTask, _) => (
                    <ListItem button key={periodicTask.id} onClick={() => this.handlePeriodicTaskSelect(periodicTask)} selected={this.isSelected(periodicTask)}>
                        <ListItemText primary={periodicTask.name} secondary={getDateTimeString(periodicTask)} />
                    </ListItem>
                ))}
            </List>
            : <List></List>

        return <div>
            {periodicTaskList}
        </div>;
    }

    private handlePeriodicTaskSelect = (periodicTask: PeriodicTask): void => this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));
    private isSelected = (periodicTask: PeriodicTask): boolean => this.props.state.periodicTaskSelected !== null && this.props.state.periodicTaskSelected.id === periodicTask.id;
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
