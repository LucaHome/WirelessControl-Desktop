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

import "./PeriodicTasks.css";

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
                        <Switch onChange={() => this.handleToggle(periodicTask)} checked={periodicTask.active === 1} />
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
            idInput = <TextField fullWidth disabled type="text" name="id" id="id" value={this.periodicTaskSelected.id} variant="outlined" />;

            if (this.state.periodicTaskInEdit !== null && this.periodicTaskSelected.id === this.state.periodicTaskInEdit.id) {
                if (!this.validateName()) {
                    nameInput = <TextField error fullWidth type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.periodicTaskInEdit.name} variant="outlined" />;
                } else {
                    nameInput = <TextField fullWidth type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.periodicTaskInEdit.name} variant="outlined" />;
                }

                if (!this.validateWirelessSocket()) {
                    wirelessSocketSelect = <Select
                        error
                        fullWidth
                        value={this.state.periodicTaskInEdit.wirelessSocketId}
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
                } else {
                    wirelessSocketSelect = <Select
                        fullWidth
                        value={this.state.periodicTaskInEdit.wirelessSocketId}
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
                }

                wirelessSocketStateSwitch = <Switch name="wirelessSocketState" id="wirelessSocketState"
                    onChange={() => {
                        this.periodicTaskSelected.wirelessSocketState = this.periodicTaskSelected.wirelessSocketState === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) });
                    }}
                    checked={this.periodicTaskSelected.wirelessSocketState === 1} />;

                if (!this.validateWeekday()) {
                    weekdaySelect = <Select
                        error
                        fullWidth
                        value={this.state.periodicTaskInEdit.weekday}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                id="weekday"
                                labelWidth={0}
                                name="weekday"
                            />
                        } >
                        <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>
                        {weekdayArray.map((weekday: string, index: number) => (
                            <MenuItem value={index}>{weekday}</MenuItem>
                        ))}
                    </Select>;
                } else {
                    weekdaySelect = <Select
                        fullWidth
                        value={this.state.periodicTaskInEdit.weekday}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                id="weekday"
                                labelWidth={0}
                                name="weekday"
                            />
                        } >
                        <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>
                        {weekdayArray.map((weekday: string, index: number) => (
                            <MenuItem value={index}>{weekday}</MenuItem>
                        ))}
                    </Select>;
                }

                const date: Date = new Date(Date.now());
                date.setHours(this.periodicTaskSelected.hour);
                date.setMinutes(this.periodicTaskSelected.minute);
                if (!this.validateTime()) {
                    timePicker = <div className="picker">
                        <TimePicker
                            error
                            fullWidth
                            className="wc-full-width"
                            ampm={false}
                            value={date}
                            onChange={this.handleChangeTime}
                            variant="outlined"
                        />
                    </div>;
                } else {
                    timePicker = <div className="picker">
                        <TimePicker
                            fullWidth
                            className="wc-full-width"
                            ampm={false}
                            value={date}
                            onChange={this.handleChangeTime}
                            variant="outlined"
                        />
                    </div>;
                }

                periodicSwitch = <Switch name="periodic" id="periodic"
                    onChange={() => { this.periodicTaskSelected.periodic = this.periodicTaskSelected.periodic === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) }); }}
                    checked={this.periodicTaskSelected.periodic === 1} />;

                activeSwitch = <Switch name="active" id="active"
                    onChange={() => { this.periodicTaskSelected.active = this.periodicTaskSelected.active === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) }); }}
                    checked={this.periodicTaskSelected.active === 1} />;

                submitButton = <Button className="wc-button-submit" disabled={!this.validateForm()} type="submit" color="primary">Save</Button>;
                cancelEditButton = <Button className="wc-button-submit" type="button" color="primary" onClick={() => this.setState({ periodicTaskInEdit: null })}>Cancel</Button>;
                deleteButton = <Button className="wc-button-delete" type="button" color="secondary" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</Button>;
            } else {
                nameInput = <TextField fullWidth disabled type="text" name="name" id="name" value={this.periodicTaskSelected.name} variant="outlined" />;
                const wirelessSocket: WirelessSocket = this.props.state.wirelessSockets.find((x: WirelessSocket) => x.id === this.periodicTaskSelected.wirelessSocketId);
                wirelessSocketSelect = <TextField fullWidth disabled type="text" name="wirelessSocket" id="wirelessSocket" value={wirelessSocket.name} variant="outlined" />;
                wirelessSocketStateSwitch = <Switch disabled name="wirelessSocketState" id="wirelessSocketState" checked={this.periodicTaskSelected.wirelessSocketState === 1} />;
                weekdaySelect = <TextField fullWidth disabled type="text" name="weekday" id="weekday" value={weekdayArray[this.periodicTaskSelected.weekday]} variant="outlined" />;
                timePicker = <TextField fullWidth disabled type="text" name="time" id="time" value={getTimeString(this.periodicTaskSelected)} variant="outlined" />;
                periodicSwitch = <Switch disabled name="periodic" id="periodic" checked={this.periodicTaskSelected.periodic === 1} />;
                activeSwitch = <Switch disabled name="active" id="active" checked={this.periodicTaskSelected.active === 1} />;
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
                            <FormControl fullWidth onSubmit={this.handleSubmit} className={this.props.classes.formControl}>
                                <FormGroup>
                                    <FormControlLabel label="" control={idInput} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={nameInput} />
                                </FormGroup>
                                <div className="wc-full-width">
                                    <FormGroup className="wireless-socket-name-container">
                                        <FormControlLabel label="" control={wirelessSocketSelect} />
                                    </FormGroup>
                                    <FormGroup className="wireless-socket-state-container">
                                        <FormControlLabel label="" control={wirelessSocketStateSwitch} />
                                    </FormGroup>
                                </div>
                                <div className="wc-full-width">
                                    <FormGroup className="periodic-task-weekday-container">
                                        <FormControlLabel label="" control={weekdaySelect} />
                                    </FormGroup>
                                    <FormGroup className="periodic-task-time-container">
                                        <FormControlLabel label="" control={timePicker} />
                                    </FormGroup>
                                </div>
                                <div className="wc-full-width">
                                    <FormGroup className="periodic-task-periodic-container">
                                        <FormControlLabel label="" control={periodicSwitch} />
                                    </FormGroup>
                                    <FormGroup className="periodic-task-active-container">
                                        <FormControlLabel label="" control={activeSwitch} />
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

    private handleToggle = (periodicTask: PeriodicTask): void => {
        periodicTask.active = periodicTask.active === 0 ? 1 : 0;
        this.props.dispatch(periodicTaskUpdate(periodicTask));
    }

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
                this.props.dispatch(periodicTaskAdd(this.state.periodicTaskInEdit));
                break;
            case EditMode.Edit:
                this.props.dispatch(periodicTaskUpdate(this.state.periodicTaskInEdit));
                break;
        }

        this.setState({
            areaInEdit: null,
            editMode: EditMode.Null,
        });
    }

    private validateName = (): boolean => this.state.periodicTaskInEdit !== null
        && (this.state.periodicTaskInEdit.name.length >= 3
            && this.state.periodicTaskInEdit.name.length <= 128)
    private validateWirelessSocket = (): boolean => this.state.periodicTaskInEdit !== null
        && this.state.periodicTaskInEdit.wirelessSocketId !== -1
    private validateWeekday = (): boolean => this.state.periodicTaskInEdit !== null
        && this.state.periodicTaskInEdit.weekday !== -1
    private validateTime = (): boolean => this.state.periodicTaskInEdit !== null
        && this.state.periodicTaskInEdit.hour >= 0 && this.state.periodicTaskInEdit.hour <= 23
        && this.state.periodicTaskInEdit.minute >= 0 && this.state.periodicTaskInEdit.minute <= 59

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
