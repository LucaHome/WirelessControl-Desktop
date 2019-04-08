import {
    Avatar, Button as MatButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Switch,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";
import { Button as RsButton, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { EditMode } from "../../enums";
import { WirelessSocket } from "../../models";
import { wirelessSocketAdd, wirelessSocketAddLocal, wirelessSocketDelete, wirelessSocketSelectSuccessful, wirelessSocketUpdate } from "../../store/actions";
import { getWirelessSocketsForArea } from "../../store/selectors";
import { clone, maxId } from "../../utils/wireless-sockets.utils";
import { IWirelessSocketsProps } from "./IWirelessSocketsProps";

import "./WirelessSockets.css";

class WirelessSockets extends React.Component<IWirelessSocketsProps, any> {

    public state = {
        deleteDialogOpen: false,
        editMode: EditMode.Null,
        wirelessSocketInEdit: null,
    };

    private wirelessSockets: WirelessSocket[] = [];
    private wirelessSocketSelected: WirelessSocket = null;

    constructor(props: IWirelessSocketsProps) {
        super(props);
    }

    public render() {
        this.wirelessSockets = getWirelessSocketsForArea(this.props.state);
        // TODO fix bug after adding a new wireless socket using handleAdd (error thrown in .some ...)
        if (!this.wirelessSockets.some((wirelessSocket) => this.props.state.wirelessSocketSelected !== null && wirelessSocket.id === this.props.state.wirelessSocketSelected.id)) {
            this.handleSelect(this.wirelessSockets.length > 0 ? this.wirelessSockets[0] : null);
        }
        this.wirelessSocketSelected = this.props.state.wirelessSocketSelected;

        const wirelessSocketList = this.wirelessSockets.length > 0
            ? <List>
                {this.wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                    <ListItem button key={wirelessSocket.id} onClick={() => this.handleSelect(wirelessSocket)} selected={this.isSelected(wirelessSocket)}>
                        <Avatar>
                            <i className={wirelessSocket.icon}></i>
                        </Avatar>
                        <ListItemText primary={wirelessSocket.name} secondary={wirelessSocket.code} />
                        <Switch onChange={() => this.handleToggle(wirelessSocket)} checked={wirelessSocket.state === 0} />
                        {wirelessSocket.deletable === 1
                            ? <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={() => this.handleEdit(wirelessSocket)}>
                                    <EditIcon color={(this.state.wirelessSocketInEdit !== null && wirelessSocket.id === this.state.wirelessSocketInEdit.id) ? "secondary" : "primary"} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null}
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        let idInput = <div></div>;

        let nameInput = <div></div>;
        let nameFormFeedback = <div></div>;

        let codeInput = <div></div>;
        let codeFormFeedback = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.wirelessSocketSelected !== null) {
            idInput = <Input disabled type="text" name="id" id="id" value={this.wirelessSocketSelected.id} />;

            if ((this.state.wirelessSocketInEdit !== null && this.wirelessSocketSelected.id === this.state.wirelessSocketInEdit.id) && this.wirelessSocketSelected.deletable === 1) {
                if (!this.validateName()) {
                    nameInput = <Input invalid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.wirelessSocketInEdit.name} />;
                    nameFormFeedback = <FormFeedback>Invalid name</FormFeedback>;
                } else {
                    nameInput = <Input valid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.wirelessSocketInEdit.name} />;
                }

                if (!this.validateCode()) {
                    codeInput = <Input invalid type="text" name="code" id="code" placeholder="Enter the code" onChange={this.handleChange} value={this.state.wirelessSocketInEdit.code} />;
                    codeFormFeedback = <FormFeedback>Invalid code</FormFeedback>;
                } else {
                    codeInput = <Input valid type="text" name="code" id="code" placeholder="Enter the code" onChange={this.handleChange} value={this.state.wirelessSocketInEdit.code} />;
                }

                submitButton = <RsButton className="wireless-socket-button-submit" disabled={!this.validateForm()} type="submit">Save</RsButton>;
                cancelEditButton = <RsButton className="wireless-socket-button-submit" type="button" onClick={() => this.setState({ wirelessSocketInEdit: null })}>Cancel</RsButton>;
                deleteButton = <RsButton className="wireless-socket-button-delete" type="button" color="danger" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</RsButton>;
            } else {
                nameInput = <Input disabled type="text" name="name" id="name" value={this.wirelessSocketSelected.name} />;
                codeInput = <Input disabled type="text" name="code" id="code" value={this.wirelessSocketSelected.code} />;
            }
        }

        return <div>
            <div className="wireless-socket-list-container">
                {wirelessSocketList}
            </div>
            <div className="wireless-socket-form-container">
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
                    <FormGroup>
                        <Label for="code">Code</Label>
                        {codeInput}
                        {codeFormFeedback}
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
                <DialogTitle id="alert-dialog-title">{"Delete the selected wireless socket?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this wireless socket, all associated periodic tasks will be deleted. This cannot be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MatButton onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>Cancel</MatButton>
                    <MatButton onClick={this.handleDelete} color="secondary">Delete</MatButton>
                </DialogActions>
            </Dialog>
        </div>;
    }

    private handleSelect = (wirelessSocket: WirelessSocket): void => this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));
    private isSelected = (wirelessSocket: WirelessSocket): boolean => this.wirelessSocketSelected !== null && this.wirelessSocketSelected.id === wirelessSocket.id;

    private handleToggle = (wirelessSocket: WirelessSocket): void => {
        wirelessSocket.state = wirelessSocket.state === 0 ? 1 : 0;
        this.props.dispatch(wirelessSocketUpdate(wirelessSocket));
    }

    private handleAdd = (): void => {
        const wirelessSocket: WirelessSocket = {
            area: this.props.state.areaSelected.filter,
            code: "",
            deletable: 1,
            description: "",
            icon: "",
            id: maxId(this.props.state.wirelessSockets) + 1,
            name: "",
            state: 0,
        };
        this.props.dispatch(wirelessSocketAddLocal(wirelessSocket));
        this.setState({
            editMode: EditMode.Add,
            wirelessSocketInEdit: wirelessSocket,
        });
    }

    private handleEdit = (wirelessSocket: WirelessSocket): void => {
        this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));
        this.setState({
            editMode: EditMode.Edit,
            wirelessSocketInEdit: clone(wirelessSocket),
        });
    }

    private handleChange = (event) => {
        const wirelessSocket: WirelessSocket = this.state.wirelessSocketInEdit;
        wirelessSocket[event.target.id] = event.target.value;
        this.setState({ wirelessSocketInEdit: clone(wirelessSocket) });
    }

    private handleSubmit = (event) => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(wirelessSocketAdd(this.state.wirelessSocketInEdit));
                break;
            case EditMode.Edit:
                this.props.dispatch(wirelessSocketUpdate(this.state.wirelessSocketInEdit));
                break;
        }

        this.setState({
            areaInEdit: null,
            editMode: EditMode.Null,
        });
    }

    private validateName = (): boolean => this.state.wirelessSocketInEdit !== null && (this.state.wirelessSocketInEdit.deletable === 0 || this.state.wirelessSocketInEdit.name.length > 0);
    private validateCode = (): boolean => this.state.wirelessSocketInEdit !== null && (this.state.wirelessSocketInEdit.deletable === 0 || this.state.wirelessSocketInEdit.code.length === 6);
    private validateForm = (): boolean => this.validateName() && this.validateCode();

    private handleDelete = (): void => {
        this.props.dispatch(wirelessSocketDelete(this.state.wirelessSocketInEdit));
        this.setState({ wirelessSocketInEdit: null, deleteDialogOpen: false });
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
