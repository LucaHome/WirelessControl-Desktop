import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormControlLabel,
    FormGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, OutlinedInput, Select,
    Switch, TextField, Typography, withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { TimePicker } from "material-ui-pickers";
import * as React from "react";
import { connect } from "react-redux";

import { weekdayArray } from "../../constants/periodic-tasks.constants";
import { formStyles } from "../../constants/style.constants";
import { EditMode } from "../../enums";
import { PeriodicTask, WirelessSocket } from "../../models";
import { periodicTaskAdd, periodicTaskAddLocal, periodicTaskDelete, periodicTaskSelectSuccessful, periodicTaskUpdate } from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { clone, maxId } from "../../utils/entity.utils";
import { getDateTimeString, getTimeString } from "../../utils/periodic-tasks.utils";
import { IPeriodicTasksProps } from "./IPeriodicTasksProps";

import "./PeriodicTasks.scss";

class PeriodicTasks extends React.Component<IPeriodicTasksProps, any> {

    public state = {
        deleteDialogOpen: false,
        editMode: EditMode.Null,
        periodicTaskInEdit: null,
    };

    private periodicTasks: PeriodicTask[] = [];
    private periodicTaskSelected: PeriodicTask = null;

    constructor(props: IPeriodicTasksProps) {
        super(props);
    }

    public render() {
        this.periodicTasks = getPeriodicTasksForWirelessSocket(this.props.state);
        this.periodicTaskSelected = this.props.state.periodicTaskSelected;

        if (!this.periodicTasks.some((periodicTask) => this.periodicTaskSelected !== null && periodicTask.id === this.periodicTaskSelected.id)) {
            this.handleSelect(this.periodicTasks.length > 0 ? this.periodicTasks[0] : null);
        }

        const periodicTaskList = this.periodicTasks.length > 0
            ? <List>
                {this.periodicTasks.map((periodicTask: PeriodicTask, _) => (
                    <ListItem button key={periodicTask.id} onClick={() => this.handleSelect(periodicTask)} selected={this.isSelected(periodicTask)}>
                        <ListItemText primary={periodicTask.name} secondary={getDateTimeString(periodicTask)} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" onClick={() => this.handleEdit(periodicTask)}>
                                <EditIcon color={(this.state.periodicTaskInEdit !== null && periodicTask.id === this.state.periodicTaskInEdit.id) ? "secondary" : "primary"} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        let idInput = <div></div>;
        let nameInput = <div></div>;
        let wirelessSocketSelect = <div></div>;
        let wirelessSocketStateSwitch = <div></div>;
        let weekdaySelect = <div></div>;
        let timePicker = <div></div>;
        let periodicSwitch = <div></div>;
        let activeSwitch = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.periodicTaskSelected !== null) {
            const canBeEdited = this.state.periodicTaskInEdit !== null && this.periodicTaskSelected.id === this.state.periodicTaskInEdit.id;

            idInput = <TextField
                fullWidth
                disabled
                label="Id"
                type="text"
                name="id"
                id="id"
                value={this.periodicTaskSelected.id}
                variant="outlined" />;

            nameInput = <TextField
                error={!this.validateName()}
                disabled={!canBeEdited}
                fullWidth
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="Enter a name"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.periodicTaskInEdit.name : this.periodicTaskSelected.name}
                variant="outlined" />;

            wirelessSocketSelect = <Select
                error={!this.validateWirelessSocket()}
                disabled={!canBeEdited}
                fullWidth
                value={canBeEdited ? this.state.periodicTaskInEdit.wirelessSocketId : this.periodicTaskSelected.wirelessSocketId}
                onChange={this.handleChangeWirelessSocket}
                input={
                    <OutlinedInput
                        id="wirelessSocket"
                        labelWidth={0}
                        name="wirelessSocket"
                    />
                } >
                <MenuItem value={-1}>
                    <em>None</em>
                </MenuItem>
                {this.props.state.wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                    <MenuItem value={wirelessSocket.id}>{wirelessSocket.name}</MenuItem>
                ))}
            </Select>;

            wirelessSocketStateSwitch = <Switch
                disabled={!canBeEdited}
                name="wirelessSocketState"
                id="wirelessSocketState"
                onChange={() => {
                    this.state.periodicTaskInEdit.wirelessSocketState = this.state.periodicTaskInEdit.wirelessSocketState === 0 ? 1 : 0;
                    this.setState({ periodicTaskInEdit: clone(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.wirelessSocketState === 1 : this.periodicTaskSelected.wirelessSocketState === 1} />;

            weekdaySelect = <Select
                error={!this.validateWeekday()}
                disabled={!canBeEdited}
                fullWidth
                value={canBeEdited ? this.state.periodicTaskInEdit.weekday : this.periodicTaskSelected.weekday}
                onChange={this.handleChange}
                input={
                    <OutlinedInput
                        id="weekday"
                        labelWidth={0}
                        name="weekday"
                    />
                } >
                <MenuItem value={0}>
                    <em>None</em>
                </MenuItem>
                {weekdayArray.map((weekday: string, index: number) => (
                    <MenuItem value={index + 1}>{weekday}</MenuItem>
                ))}
            </Select>;

            const date: Date = new Date(Date.now());
            date.setHours(canBeEdited ? this.state.periodicTaskInEdit.hour : this.periodicTaskSelected.hour);
            date.setMinutes(canBeEdited ? this.state.periodicTaskInEdit.minute : this.periodicTaskSelected.minute);
            timePicker = <div className="picker">
                <TimePicker
                    error={!this.validateTime()}
                    disabled={!canBeEdited}
                    fullWidth
                    label="Time"
                    className="wc-full-width"
                    ampm={false}
                    value={date}
                    onChange={this.handleChangeTime}
                    variant="outlined"
                />
            </div>;

            periodicSwitch = <Switch
                disabled={!canBeEdited}
                name="periodic"
                id="periodic"
                onChange={() => {
                    this.state.periodicTaskInEdit.periodic = this.state.periodicTaskInEdit.periodic === 0 ? 1 : 0;
                    this.setState({ periodicTaskInEdit: clone(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.periodic === 1 : this.periodicTaskSelected.active === 1} />;

            activeSwitch = <Switch
                disabled={!canBeEdited}
                name="active"
                id="active"
                onChange={() => {
                    this.state.periodicTaskInEdit.active = this.state.periodicTaskInEdit.active === 0 ? 1 : 0;
                    this.setState({ periodicTaskInEdit: clone(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.active === 1 : this.periodicTaskSelected.active === 1} />;

            if (canBeEdited) {
                submitButton = <Button className="wc-button-submit" disabled={!this.validateForm()} type="button" color="primary" onClick={this.handleSubmit}>Save</Button>;
                cancelEditButton = <Button className="wc-button-submit" type="button" color="primary" onClick={() => this.setState({ periodicTaskInEdit: null })}>Cancel</Button>;
                deleteButton = <Button className="wc-button-delete" type="button" color="secondary" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</Button>;
            }
        }

        return <div>
            <Typography className="wc-full-width" component="h5" variant="h5" gutterBottom>{this.props.state.wirelessSocketSelected ? this.props.state.wirelessSocketSelected.name : ""}</Typography>
            {this.periodicTaskSelected !== null
                ? <div>
                    <div className="wc-list-container">
                        {periodicTaskList}
                    </div>
                    <div className="wc-form-container">
                        <div className={this.props.classes.root}>
                            <FormControl fullWidth className={this.props.classes.formControl}>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{idInput}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{nameInput}</div>} />
                                </FormGroup>
                                <div className="wc-full-width">
                                    <FormGroup className="wireless-socket-name-container">
                                        <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{wirelessSocketSelect}</div>} />
                                    </FormGroup>
                                    <FormGroup className="wireless-socket-state-container">
                                        <FormControlLabel label="State" control={<div className="wc-margin-bottom-1-rem">{wirelessSocketStateSwitch}</div>} />
                                    </FormGroup>
                                </div>
                                <div className="wc-full-width">
                                    <FormGroup className="periodic-task-weekday-container">
                                        <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{weekdaySelect}</div>} />
                                    </FormGroup>
                                    <FormGroup className="periodic-task-time-container">
                                        <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{timePicker}</div>} />
                                    </FormGroup>
                                </div>
                                <div className="wc-full-width">
                                    <FormGroup className="periodic-task-periodic-container">
                                        <FormControlLabel label="Periodic" control={periodicSwitch} />
                                    </FormGroup>
                                    <FormGroup className="periodic-task-active-container">
                                        <FormControlLabel label="Active" control={activeSwitch} />
                                    </FormGroup>
                                </div>
                                <div className="wc-button-container">
                                    {submitButton}
                                    {cancelEditButton}
                                    {deleteButton}
                                </div>
                            </FormControl>
                        </div>
                    </div>
                    <Fab color="primary" aria-label="Add" className="wc-button-add" onClick={this.handleAdd}>
                        <AddIcon />
                    </Fab>
                    <Dialog
                        open={this.state.deleteDialogOpen}
                        onClose={() => this.setState({ deleteDialogOpen: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Delete the selected periodic task?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This cannot be undone!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>Cancel</Button>
                            <Button onClick={this.handleDelete} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                : null
            }
        </div>;
    }

    private handleSelect = (periodicTask: PeriodicTask): void => this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));
    private isSelected = (periodicTask: PeriodicTask): boolean => this.periodicTaskSelected !== null && this.periodicTaskSelected.id === periodicTask.id;

    private handleAdd = (): void => {
        const now = new Date(Date.now());
        const periodicTask: PeriodicTask = {
            active: 1,
            hour: now.getHours(),
            id: maxId(this.props.state.periodicTasks) + 1,
            minute: now.getMinutes(),
            name: "",
            periodic: 1,
            // The php server side counts from 1 - Monday to 7 - Sunday
            weekday: now.getDay() === 0 ? 7 : now.getDay(),
            wirelessSocketId: this.props.state.wirelessSocketSelected.id,
            wirelessSocketState: this.props.state.wirelessSocketSelected.state,
        };
        this.props.dispatch(periodicTaskAddLocal(periodicTask));
        this.setState({
            editMode: EditMode.Add,
            periodicTaskInEdit: periodicTask,
        });
    }

    private handleEdit = (periodicTask: PeriodicTask): void => {
        this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));
        this.setState({
            editMode: EditMode.Edit,
            periodicTaskInEdit: clone(periodicTask),
        });
    }

    private handleChange = (event: any) => {
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        periodicTask[event.target.name] = event.target.value;
        this.setState({ periodicTaskInEdit: clone(periodicTask) });
    }

    private handleChangeWirelessSocket = (event: any) => {
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        periodicTask.wirelessSocketId = event.target.value;
        this.setState({ periodicTaskInEdit: clone(periodicTask) });
    }

    private handleChangeTime = (selectedValue: any) => {
        const selectedTime: Date = new Date(selectedValue);
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        if (selectedTime !== null) {
            periodicTask.hour = selectedTime.getHours();
            periodicTask.minute = selectedTime.getMinutes();
        } else {
            periodicTask.hour = -1;
            periodicTask.minute = -1;
        }
        this.setState({ periodicTaskInEdit: clone(periodicTask) });
    }

    private handleSubmit = (event: any) => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(periodicTaskAdd(this.state.periodicTaskInEdit, this.props.state.wirelessSockets, this.props.state.areas));
                break;
            case EditMode.Edit:
                this.props.dispatch(periodicTaskUpdate(this.state.periodicTaskInEdit));
                break;
        }

        this.setState({
            editMode: EditMode.Null,
            periodicTaskInEdit: null,
        });
    }

    private validateName = (): boolean => this.state.periodicTaskInEdit === null
        || (this.state.periodicTaskInEdit.name.length >= 3 && this.state.periodicTaskInEdit.name.length <= 128)
    private validateWirelessSocket = (): boolean => this.state.periodicTaskInEdit === null
        || this.state.periodicTaskInEdit.wirelessSocketId !== -1
    private validateWeekday = (): boolean => this.state.periodicTaskInEdit === null
        || this.state.periodicTaskInEdit.weekday !== -1
    private validateTime = (): boolean => this.state.periodicTaskInEdit === null
        || (this.state.periodicTaskInEdit.hour >= 0 && this.state.periodicTaskInEdit.hour <= 23 && this.state.periodicTaskInEdit.minute >= 0 && this.state.periodicTaskInEdit.minute <= 59)

    private validateForm = (): boolean => this.validateName() && this.validateWirelessSocket() && this.validateWeekday() && this.validateTime();

    private handleDelete = (): void => {
        this.props.dispatch(periodicTaskDelete(this.state.periodicTaskInEdit));
        this.setState({ periodicTaskInEdit: null, deleteDialogOpen: false });
    }
}

const mapStateToProps = (state: any) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
    };
};

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(PeriodicTasks));
