import {
    Button as MatButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab,
    IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select, Switch,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { TimePicker } from "material-ui-pickers";
import * as React from "react";
import { connect } from "react-redux";
import { Button as RsButton, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { weekdayArray } from "../../constants/periodic-tasks.constants";
import { EditMode } from "../../enums";
import { PeriodicTask, WirelessSocket } from "../../models";
import { periodicTaskAdd, periodicTaskAddLocal, periodicTaskDelete, periodicTaskSelectSuccessful, periodicTaskUpdate } from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { clone, getDateTimeString, getTimeString, maxId } from "../../utils/periodic-tasks.utils";
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
        let nameFormFeedback = <div></div>;

        let wirelessSocketSelect = <div></div>;
        let wirelessSocketFormFeedback = <div></div>;

        let wirelessSocketStateSwitch = <div></div>;

        let weekdaySelect = <div></div>;
        let weekdayFormFeedback = <div></div>;

        let timePicker = <div></div>;
        let timeFormFeedback = <div></div>;

        let periodicSwitch = <div></div>;

        let activeSwitch = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.periodicTaskSelected !== null) {
            idInput = <Input disabled type="text" name="id" id="id" value={this.periodicTaskSelected.id} />;

            if (this.state.periodicTaskInEdit !== null && this.periodicTaskSelected.id === this.state.periodicTaskInEdit.id) {
                if (!this.validateName()) {
                    nameInput = <Input invalid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.periodicTaskInEdit.name} />;
                    nameFormFeedback = <FormFeedback>Invalid name</FormFeedback>;
                } else {
                    nameInput = <Input valid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.periodicTaskInEdit.name} />;
                }

                wirelessSocketSelect = <div>
                    <Select
                        className="wc-full-width"
                        value={this.state.periodicTaskInEdit.wirelessSocketId}
                        onChange={this.handleChangeWirelessSocket}
                        inputProps={{
                            id: "wirelessSocket",
                            name: "wirelessSocket",
                        }} >
                        <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>
                        {this.props.state.wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                            <MenuItem value={wirelessSocket.id}>{wirelessSocket.name}</MenuItem>
                        ))}
                    </Select>
                </div>;
                if (!this.validateWirelessSocket()) {
                    wirelessSocketFormFeedback = <FormFeedback>Invalid wireless socket</FormFeedback>;
                }

                wirelessSocketStateSwitch = <Switch name="wirelessSocketState" id="wirelessSocketState"
                    onChange={() => {
                        this.periodicTaskSelected.wirelessSocketState = this.periodicTaskSelected.wirelessSocketState === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) });
                    }}
                    checked={this.periodicTaskSelected.wirelessSocketState === 1} />;

                weekdaySelect = <div>
                    <Select
                        className="wc-full-width"
                        value={this.state.periodicTaskInEdit.weekday}
                        onChange={this.handleChange}
                        inputProps={{
                            id: "weekday",
                            name: "weekday",
                        }} >
                        <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>
                        {weekdayArray.map((weekday: string, index: number) => (
                            <MenuItem value={index}>{weekday}</MenuItem>
                        ))}
                    </Select>
                </div>;
                if (!this.validateWeekday()) {
                    weekdayFormFeedback = <FormFeedback>Invalid weekday</FormFeedback>;
                }

                const date: Date = new Date(Date.now());
                date.setHours(this.periodicTaskSelected.hour);
                date.setMinutes(this.periodicTaskSelected.minute);
                timePicker = <div className="picker">
                    <TimePicker
                        className="wc-full-width"
                        ampm={false}
                        value={date}
                        onChange={this.handleChangeTime}
                    />
                </div>;
                if (!this.validateTime()) {
                    timeFormFeedback = <FormFeedback>Invalid time</FormFeedback>;
                }

                periodicSwitch = <Switch name="periodic" id="periodic"
                    onChange={() => { this.periodicTaskSelected.periodic = this.periodicTaskSelected.periodic === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) }); }}
                    checked={this.periodicTaskSelected.periodic === 1} />;

                activeSwitch = <Switch name="active" id="active"
                    onChange={() => { this.periodicTaskSelected.active = this.periodicTaskSelected.active === 0 ? 1 : 0; this.setState({ periodicTaskInEdit: clone(this.periodicTaskSelected) }); }}
                    checked={this.periodicTaskSelected.active === 1} />;

                submitButton = <RsButton className="wc-button-submit" disabled={!this.validateForm()} type="submit">Save</RsButton>;
                cancelEditButton = <RsButton className="wc-button-submit" type="button" onClick={() => this.setState({ periodicTaskInEdit: null })}>Cancel</RsButton>;
                deleteButton = <RsButton className="wc-button-delete" type="button" color="danger" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</RsButton>;
            } else {
                nameInput = <Input disabled type="text" name="name" id="name" value={this.periodicTaskSelected.name} />;
                const wirelessSocket: WirelessSocket = this.props.state.wirelessSockets.find((x: WirelessSocket) => x.id === this.periodicTaskSelected.wirelessSocketId);
                wirelessSocketSelect = <Input disabled type="text" name="wirelessSocket" id="wirelessSocket" value={wirelessSocket.name} />;
                wirelessSocketStateSwitch = <Switch disabled name="wirelessSocketState" id="wirelessSocketState" checked={this.periodicTaskSelected.wirelessSocketState === 1} />;
                weekdaySelect = <Input disabled type="text" name="weekday" id="weekday" value={weekdayArray[this.periodicTaskSelected.weekday]} />;
                timePicker = <Input disabled type="text" name="time" id="time" value={getTimeString(this.periodicTaskSelected)} />;
                periodicSwitch = <Switch disabled name="periodic" id="periodic" checked={this.periodicTaskSelected.periodic === 1} />;
                activeSwitch = <Switch disabled name="active" id="active" checked={this.periodicTaskSelected.active === 1} />;
            }
        }

        return <div>{
            this.periodicTaskSelected !== null
                ? <div>
                    <div className="wc-list-container">
                        {periodicTaskList}
                    </div>
                    <div className="wc-form-container">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                {idInput}
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                {nameInput}
                                {nameFormFeedback}
                            </FormGroup>
                            <div className="wc-full-width">
                                <FormGroup className="wireless-socket-name-container">
                                    <Label for="wirelessSocket">WirelessSocket</Label>
                                    {wirelessSocketSelect}
                                    {wirelessSocketFormFeedback}
                                </FormGroup>
                                <FormGroup className="wireless-socket-state-container">
                                    <Label className="wc-full-width" for="state">WirelessSocket State</Label>
                                    {wirelessSocketStateSwitch}
                                </FormGroup>
                            </div>
                            <div className="wc-full-width">
                                <FormGroup className="periodic-task-weekday-container">
                                    <Label for="weekday">Weekday</Label>
                                    {weekdaySelect}
                                    {weekdayFormFeedback}
                                </FormGroup>
                                <FormGroup className="periodic-task-time-container">
                                    <Label for="time">Time</Label>
                                    {timePicker}
                                    {timeFormFeedback}
                                </FormGroup>
                            </div>
                            <div className="wc-full-width">
                                <FormGroup className="periodic-task-periodic-container">
                                    <Label className="wc-full-width" for="periodic">Periodic</Label>
                                    {periodicSwitch}
                                </FormGroup>
                                <FormGroup className="periodic-task-active-container">
                                    <Label className="wc-full-width" for="active">Active</Label>
                                    {activeSwitch}
                                </FormGroup>
                            </div>
                            <div className="wc-button-container">
                                {submitButton}
                                {cancelEditButton}
                                {deleteButton}
                            </div>
                        </Form>
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
                            <MatButton onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>Cancel</MatButton>
                            <MatButton onClick={this.handleDelete} color="secondary">Delete</MatButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicTasks);
