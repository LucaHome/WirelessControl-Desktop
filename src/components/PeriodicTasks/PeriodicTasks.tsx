import {
    Button as MatButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";
import { Button as RsButton, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { EditMode } from "../../enums";
import { PeriodicTask } from "../../models";
import { periodicTaskAdd, periodicTaskAddLocal, periodicTaskDelete, periodicTaskSelectSuccessful, periodicTaskUpdate } from "../../store/actions";
import { getPeriodicTasksForWirelessSocket } from "../../store/selectors";
import { clone, getDateTimeString, maxId } from "../../utils/periodic-tasks.utils";
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
        // TODO fix bug after adding a new periodic task using handleAdd (error thrown in .some ...)
        if (!this.periodicTasks.some((periodicTask) => this.props.state.periodicTaskSelected !== null && periodicTask.id === this.props.state.periodicTaskSelected.id)) {
            this.handleSelect(this.periodicTasks.length > 0 ? this.periodicTasks[0] : null);
        }
        this.periodicTaskSelected = this.props.state.periodicTaskSelected;

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
        let nameFormFeedback = <div></div>;

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

                submitButton = <RsButton className="periodic-task-button-submit" disabled={!this.validateForm()} type="submit">Save</RsButton>;
                cancelEditButton = <RsButton className="periodic-task-button-submit" type="button" onClick={() => this.setState({ periodicTaskInEdit: null })}>Cancel</RsButton>;
                deleteButton = <RsButton className="periodic-task-button-delete" type="button" color="danger" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</RsButton>;
            } else {
                nameInput = <Input disabled type="text" name="name" id="name" value={this.periodicTaskSelected.name} />;
            }
        }

        return <div>
            <div className="periodic-task-list-container">
                {periodicTaskList}
            </div>
            <div className="periodic-task-form-container">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Id</Label>
                        {idInput}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        {nameInput}
                        {nameFormFeedback}
                    </FormGroup>
                    // TODO add further fields
                    {submitButton}
                    {cancelEditButton}
                    {deleteButton}
                </Form>
            </div>
            <Fab color="primary" aria-label="Add" className="area-button-add" onClick={this.handleAdd}>
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

    private handleChange = (event) => {
        const periodicTask: PeriodicTask = this.state.periodicTaskInEdit;
        periodicTask[event.target.id] = event.target.value;
        this.setState({ periodicTaskInEdit: clone(periodicTask) });
    }

    private handleSubmit = (event) => {
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

    private validateName = (): boolean => this.state.periodicTaskInEdit !== null && this.state.periodicTaskInEdit.name.length > 0;
    private validateForm = (): boolean => this.validateName();

    private handleDelete = (): void => {
        this.props.dispatch(periodicTaskDelete(this.state.periodicTaskInEdit));
        this.setState({ periodicTaskInEdit: null, deleteDialogOpen: false });
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

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicTasks);
