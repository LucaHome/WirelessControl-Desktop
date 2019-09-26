import { cloneDeep, max } from "lodash/fp";
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

import { formStyles } from "../../constants/style.constants";
import { EditMode } from "../../enums";
import { IEntityProps } from "../../interfaces";
import { PeriodicTask, WirelessSocket } from "../../models";
import {
    periodicTaskAdd, periodicTaskAddLocal, periodicTaskDelete, periodicTaskSelectSuccessful, periodicTaskUpdate, wirelessSocketSelectById
} from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { getDateTimeString, validateName, validateTime, validateWeekday, validateWirelessSocket, weekdayArray } from "../../utils/periodic-tasks.utils";

import "./PeriodicTasks.scss";

class PeriodicTasks extends React.Component<IEntityProps<PeriodicTask>, any> {

    public state: any = {
        deleteDialogOpen: false,
        editMode: EditMode.Null,
        periodicTaskInEdit: undefined,
    };

    private periodicTasks: PeriodicTask[] = [];

    private periodicTaskSelected: PeriodicTask = undefined;

    constructor(props: IEntityProps<PeriodicTask>) {
        super(props);
    }

    public render() {
        this.periodicTasks = getPeriodicTasksForWirelessSocket(this.props.state);
        this.periodicTaskSelected = this.props.state.periodicTaskSelected;

        if (!this.periodicTasks.some((periodicTask) => this.periodicTaskSelected !== undefined && periodicTask.id === this.periodicTaskSelected.id)) {
            this.handleSelect(this.periodicTasks.length > 0 ? this.periodicTasks[0] : undefined);
        }

        const periodicTaskList: JSX.Element = this.periodicTasks.length > 0
            ? <List>
                {this.periodicTasks.map((periodicTask: PeriodicTask, _) => (
                    <ListItem button key={periodicTask.id} onClick={() => this.handleSelect(periodicTask)} selected={this.isSelected(periodicTask)}>
                        <ListItemText primary={periodicTask.name} secondary={getDateTimeString(periodicTask)} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" onClick={() => this.handleEdit(periodicTask)}>
                                <EditIcon color={(this.state.periodicTaskInEdit !== undefined && periodicTask.id === this.state.periodicTaskInEdit.id) ? "secondary" : "primary"} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        const wirelessSocketSelect: JSX.Element | "" = this.props.state.wirelessSocketSelected
            ? <Select
                disabled={!this.props.state.wirelessSockets || this.props.state.wirelessSockets.length === 0}
                fullWidth
                value={this.props.state.wirelessSocketSelected.id}
                onChange={this.handleWirelessSocketSelection}
                input={
                    <OutlinedInput
                        id="wirelessSocketSelection"
                        labelWidth={0}
                        name="wirelessSocketSelection"
                    />
                } >
                {this.props.state.wirelessSockets.map((wirelessSocket: WirelessSocket, _: any) => (
                    <MenuItem value={wirelessSocket.id}>{wirelessSocket.name}</MenuItem>
                ))}
            </Select>
            : "";

        let idInput: JSX.Element = <div></div>;
        let nameInput: JSX.Element = <div></div>;
        let wirelessSocketForPeriodicTaskSelect: JSX.Element = <div></div>;
        let wirelessSocketStateSwitch: JSX.Element = <div></div>;
        let weekdaySelect: JSX.Element = <div></div>;
        let timePicker: JSX.Element = <div></div>;
        let periodicSwitch: JSX.Element = <div></div>;
        let activeSwitch: JSX.Element = <div></div>;

        let submitButton: JSX.Element = <div></div>;
        let cancelEditButton: JSX.Element = <div></div>;
        let deleteButton: JSX.Element = <div></div>;

        if (this.periodicTaskSelected !== undefined) {
            const canBeEdited: boolean = this.state.periodicTaskInEdit !== undefined && this.periodicTaskSelected.id === this.state.periodicTaskInEdit.id;

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
                error={!validateName(this.state.periodicTaskInEdit)}
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

            wirelessSocketForPeriodicTaskSelect = <Select
                error={!validateWirelessSocket(this.state.periodicTaskInEdit)}
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
                    this.setState({ periodicTaskInEdit: cloneDeep(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.wirelessSocketState === 1 : this.periodicTaskSelected.wirelessSocketState === 1} />;

            weekdaySelect = <Select
                error={!validateWeekday(this.state.periodicTaskInEdit)}
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
                    error={!validateTime(this.state.periodicTaskInEdit)}
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
                    this.setState({ periodicTaskInEdit: cloneDeep(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.periodic === 1 : this.periodicTaskSelected.periodic === 1} />;

            activeSwitch = <Switch
                disabled={!canBeEdited}
                name="active"
                id="active"
                onChange={() => {
                    this.state.periodicTaskInEdit.active = this.state.periodicTaskInEdit.active === 0 ? 1 : 0;
                    this.setState({ periodicTaskInEdit: cloneDeep(this.state.periodicTaskInEdit) });
                }}
                checked={canBeEdited ? this.state.periodicTaskInEdit.active === 1 : this.periodicTaskSelected.active === 1} />;

            submitButton = canBeEdited
                ? <Button
                    className="wc-button-submit"
                    disabled={!this.validateForm()}
                    type="button"
                    color="primary"
                    onClick={this.handleSubmit}>Save</Button>
                : <div></div>;

            cancelEditButton = canBeEdited
                ? <Button
                    className="wc-button-submit"
                    type="button"
                    color="primary"
                    onClick={() => this.setState({ periodicTaskInEdit: undefined })}>Cancel</Button>
                : <div></div>;

            deleteButton = canBeEdited
                ? <Button
                    className="wc-button-delete"
                    type="button"
                    color="secondary"
                    onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</Button>
                : <div></div>;
        }

        return <div>
            <Typography className="wc-full-width" variant="h5" gutterBottom>{wirelessSocketSelect}</Typography>
            {this.periodicTaskSelected !== undefined
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
                                        <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{wirelessSocketForPeriodicTaskSelect}</div>} />
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
                : undefined
            }
        </div>;
    }

    private isSelected = (periodicTask: PeriodicTask): boolean => this.periodicTaskSelected !== undefined && this.periodicTaskSelected.id === periodicTask.id;

    private handleAdd = (): void => {
        const now: Date = new Date(Date.now());
        const periodicTask: PeriodicTask = {
            active: 1,
            hour: now.getHours(),
            id: max<number>(this.props.state.periodicTasks.map((periodicTask: PeriodicTask) => periodicTask.id)) + 1,
            minute: now.getMinutes(),
            name: "",
            periodic: 1,
            // The php server side counts from 1 - Monday to 7 - Sunday
            weekday: now.getDay() === 0 ? 7 : now.getDay(),
            wirelessSocketId: this.props.state.wirelessSocketSelected.id,
            wirelessSocketState: this.props.state.wirelessSocketSelected.state,
        };
        this.props.dispatch(periodicTaskAddLocal(periodicTask));
        this.setState({ editMode: EditMode.Add, periodicTaskInEdit: periodicTask });
    }

    private handleChange = (event: any): void => {
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        periodicTask[event.target.name] = event.target.value;
        this.setState({ periodicTaskInEdit: cloneDeep(periodicTask) });
    }

    private handleChangeTime = (selectedValue: any): void => {
        const selectedTime: Date = new Date(selectedValue);
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        if (selectedTime !== undefined) {
            periodicTask.hour = selectedTime.getHours();
            periodicTask.minute = selectedTime.getMinutes();
        } else {
            periodicTask.hour = -1;
            periodicTask.minute = -1;
        }
        this.setState({ periodicTaskInEdit: cloneDeep(periodicTask) });
    }

    private handleChangeWirelessSocket = (event: any): void => {
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        periodicTask.wirelessSocketId = event.target.value;
        this.setState({ periodicTaskInEdit: cloneDeep(periodicTask) });
    }

    private handleDelete = (): void => {
        this.props.dispatch(periodicTaskDelete(this.state.periodicTaskInEdit));
        this.setState({ periodicTaskInEdit: undefined, deleteDialogOpen: false });
    }

    private handleEdit = (periodicTask: PeriodicTask): void => {
        this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));
        this.setState({ editMode: EditMode.Edit, periodicTaskInEdit: cloneDeep(periodicTask) });
    }

    private handleSelect = (periodicTask: PeriodicTask): void => this.props.dispatch(periodicTaskSelectSuccessful(periodicTask));

    private handleSubmit = (event: any): void => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(periodicTaskAdd(this.state.periodicTaskInEdit, this.props.state.wirelessSockets, this.props.state.areas));
                break;
            case EditMode.Edit:
                this.props.dispatch(periodicTaskUpdate(this.state.periodicTaskInEdit));
                break;
        }

        this.setState({ editMode: EditMode.Null, periodicTaskInEdit: undefined });
    }

    private handleWirelessSocketSelection = (event: any): void => this.props.dispatch(wirelessSocketSelectById(event.target.value, this.props.state.wirelessSockets));

    private validateForm = (): boolean => validateName(this.state.periodicTaskInEdit)
        && validateTime(this.state.periodicTaskInEdit)
        && validateWeekday(this.state.periodicTaskInEdit)
        && validateWirelessSocket(this.state.periodicTaskInEdit);
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
    };
};

const mapStateToProps = (state: any) => {
    return {
        state,
    };
};

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(PeriodicTasks));
