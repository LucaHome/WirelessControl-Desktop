import { cloneDeep, max } from "lodash/fp";
import {
    Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormControlLabel,
    FormGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, OutlinedInput, Select, Switch,
    TextField, Typography, withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";

import { formStyles } from "../../constants/style.constants";
import { EditMode } from "../../enums";
import { IEntityProps } from "../../interfaces";
import { Area, WirelessSocket } from "../../models";
import {
    areaSelectByFilter, wirelessSocketAdd, wirelessSocketAddLocal, wirelessSocketDelete, wirelessSocketSelectSuccessful, wirelessSocketUpdate
} from "../../store/actions";
import { getWirelessSocketsForArea } from "../../store/selectors";
import { lastToggledText, validateArea, validateCode, validateIcon, validateName } from "../../utils/wireless-socket.utils";

import "./WirelessSockets.scss";

class WirelessSockets extends React.Component<IEntityProps<WirelessSocket>, any> {

    public state: any = {
        deleteDialogOpen: false,
        editMode: EditMode.Null,
        wirelessSocketInEdit: undefined,
    };

    private wirelessSockets: WirelessSocket[] = [];

    private wirelessSocketSelected: WirelessSocket = undefined;

    constructor(props: IEntityProps<WirelessSocket>) {
        super(props);
    }

    public render() {
        this.wirelessSockets = getWirelessSocketsForArea(this.props.state);
        this.wirelessSocketSelected = this.props.state.wirelessSocketSelected;

        if (!this.wirelessSockets.some((wirelessSocket: WirelessSocket) => this.wirelessSocketSelected !== undefined && wirelessSocket.id === this.wirelessSocketSelected.id)) {
            this.handleSelect(this.wirelessSockets.length > 0 ? this.wirelessSockets[0] : undefined);
        }

        const wirelessSocketList = this.wirelessSockets.length > 0
            ? <List>
                {this.wirelessSockets.map((wirelessSocket: WirelessSocket, _) => (
                    <ListItem button key={wirelessSocket.id} onClick={() => this.handleSelect(wirelessSocket)} selected={this.isSelected(wirelessSocket)}>
                        <Avatar color={wirelessSocket.state === 1 ? "secondary" : "primary"}>
                            <i className={wirelessSocket.icon}></i>
                        </Avatar>
                        <ListItemText primary={wirelessSocket.name} secondary={wirelessSocket.code} />
                        <Switch onChange={() => this.handleToggle(wirelessSocket)} checked={wirelessSocket.state === 1} />
                        {wirelessSocket.deletable === 1
                            ? <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={() => this.handleEdit(wirelessSocket)}>
                                    <EditIcon color={(this.state.wirelessSocketInEdit !== undefined && wirelessSocket.id === this.state.wirelessSocketInEdit.id) ? "secondary" : "primary"} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : undefined}
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        const areaSelect: JSX.Element | "" = this.props.state.areaSelected
            ? <Select
                disabled={!this.props.state.areas || this.props.state.areas.length === 0}
                fullWidth
                value={this.props.state.areaSelected.name}
                onChange={this.handleAreaSelection}
                input={
                    <OutlinedInput
                        id="areaSelection"
                        labelWidth={0}
                        name="areaSelection"
                    />
                } >
                {this.props.state.areas.map((area: Area, _: any) => (
                    <MenuItem value={area.filter}>{area.name}</MenuItem>
                ))}
            </Select>
            : "";

        let idInput: JSX.Element = <div></div>;
        let nameInput: JSX.Element = <div></div>;
        let codeInput: JSX.Element = <div></div>;
        let lastToggledInput: JSX.Element = <div></div>;
        let descriptionInput: JSX.Element = <div></div>;
        let groupInput: JSX.Element = <div></div>;
        let areaForWirelessSocketSelect: JSX.Element = <div></div>;
        let iconPreview: JSX.Element = <div></div>;
        let iconInput: JSX.Element = <div></div>;

        let submitButton: JSX.Element = <div></div>;
        let cancelEditButton: JSX.Element = <div></div>;
        let deleteButton: JSX.Element = <div></div>;

        if (this.wirelessSocketSelected !== undefined) {
            const canBeEdited: boolean = (this.state.wirelessSocketInEdit !== undefined && this.wirelessSocketSelected.id === this.state.wirelessSocketInEdit.id) && this.wirelessSocketSelected.deletable === 1;

            idInput = <TextField
                fullWidth
                disabled
                label="Id"
                type="text"
                name="id"
                id="id"
                value={this.wirelessSocketSelected.id}
                variant="outlined" />;

            nameInput = <TextField
                error={!validateName(this.state.wirelessSocketInEdit)}
                disabled={!canBeEdited}
                fullWidth
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="Enter a name"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.wirelessSocketInEdit.name : this.wirelessSocketSelected.name}
                variant="outlined"
            />;

            codeInput = <TextField
                error={!validateCode(this.state.wirelessSocketInEdit)}
                disabled={!canBeEdited}
                fullWidth
                label="Code"
                type="text"
                name="code"
                id="code"
                placeholder="Enter the code"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.wirelessSocketInEdit.code : this.wirelessSocketSelected.code}
                variant="outlined"
            />;

            lastToggledInput = <TextField
                disabled
                fullWidth
                label="LastToggled"
                type="text"
                name="lastToggled"
                id="lastToggled"
                value={lastToggledText(canBeEdited ? this.state.wirelessSocketInEdit : this.wirelessSocketSelected)}
                variant="outlined"
            />;

            descriptionInput = <TextField
                disabled={!canBeEdited}
                fullWidth
                label="Description"
                type="text"
                name="description"
                id="description"
                placeholder="Enter a description"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.wirelessSocketInEdit.description : this.wirelessSocketSelected.description}
                variant="outlined"
            />;

            groupInput = <TextField
                disabled={!canBeEdited}
                fullWidth
                label="Group"
                type="text"
                name="group"
                id="group"
                placeholder="Enter a group"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.wirelessSocketInEdit.group : this.wirelessSocketSelected.group}
                variant="outlined"
            />;

            areaForWirelessSocketSelect = <Select
                error={!validateArea(this.state.wirelessSocketInEdit, this.props.state.areas)}
                disabled={!canBeEdited}
                fullWidth
                value={canBeEdited ? this.state.wirelessSocketInEdit.area : this.wirelessSocketSelected.area}
                onChange={this.handleChange}
                input={
                    <OutlinedInput
                        id="area"
                        labelWidth={0}
                        name="area"
                    />
                } >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {this.props.state.areas.filter((area: Area) => area.filter !== "").map((area: Area, _) => (
                    <MenuItem value={area.filter}>{area.name}</MenuItem>
                ))}
            </Select>;

            iconPreview = <Avatar
                className="wireless-socket-icon-preview">
                <i className={canBeEdited ? this.state.wirelessSocketInEdit.icon : this.wirelessSocketSelected.icon}></i>
            </Avatar>;

            iconInput = <TextField
                error={!validateIcon(this.state.wirelessSocketInEdit)}
                disabled={!canBeEdited}
                fullWidth
                label="Icon"
                className="wireless-socket-icon-input"
                type="text"
                name="icon"
                id="icon"
                placeholder="Enter the icon"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.wirelessSocketInEdit.icon : this.wirelessSocketSelected.icon}
                variant="outlined" />;

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
                    onClick={() => this.setState({ wirelessSocketInEdit: undefined })}>Cancel</Button>
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
            <Typography className="wc-full-width" variant="h5" gutterBottom>{areaSelect}</Typography>
            {this.wirelessSocketSelected !== undefined
                ? <div>
                    <div className="wc-list-container">
                        {wirelessSocketList}
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
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{codeInput}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{lastToggledInput}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{descriptionInput}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{groupInput}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{areaForWirelessSocketSelect}</div>} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel label="" control={<div className="wc-full-width">{iconPreview}{iconInput}</div>} />
                                </FormGroup>
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
                        <DialogTitle id="alert-dialog-title">{"Delete the selected wireless socket?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                If you delete this wireless socket, all associated periodic tasks will be deleted. This cannot be undone!
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

    private isSelected = (wirelessSocket: WirelessSocket): boolean => this.wirelessSocketSelected !== undefined && this.wirelessSocketSelected.id === wirelessSocket.id;

    private handleAdd = (): void => {
        const wirelessSocket: WirelessSocket = {
            area: this.props.state.areaSelected.filter,
            code: "",
            deletable: 1,
            description: "",
            icon: "",
            id: max<number>(this.props.state.wirelessSockets.map((wirelessSocket: WirelessSocket) => wirelessSocket.id)) + 1,
            name: "",
            state: 0,
            lastToggled: Date.now(),
            group: ""
        };
        this.props.dispatch(wirelessSocketAddLocal(wirelessSocket));
        this.setState({ editMode: EditMode.Add, wirelessSocketInEdit: wirelessSocket });
    }

    private handleAreaSelection = (event: any): void => this.props.dispatch(areaSelectByFilter(event.target.value, this.props.state.areas));

    private handleChange = (event: any): void => {
        const wirelessSocket: WirelessSocket = this.state.wirelessSocketInEdit;
        wirelessSocket[event.target.name] = event.target.value;
        this.setState({ wirelessSocketInEdit: cloneDeep(wirelessSocket) });
    }

    private handleDelete = (): void => {
        this.props.dispatch(wirelessSocketDelete(this.state.wirelessSocketInEdit));
        this.setState({ wirelessSocketInEdit: undefined, deleteDialogOpen: false });
    }

    private handleEdit = (wirelessSocket: WirelessSocket): void => {
        this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));
        this.setState({ editMode: EditMode.Edit, wirelessSocketInEdit: cloneDeep(wirelessSocket) });
    }

    private handleSelect = (wirelessSocket: WirelessSocket): void => this.props.dispatch(wirelessSocketSelectSuccessful(wirelessSocket));

    private handleToggle = (wirelessSocket: WirelessSocket): void => {
        wirelessSocket.state = wirelessSocket.state === 0 ? 1 : 0;
        this.props.dispatch(wirelessSocketUpdate(wirelessSocket));
    }

    private handleSubmit = (event: any): void => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(wirelessSocketAdd(this.state.wirelessSocketInEdit, this.props.state.areas));
                break;
            case EditMode.Edit:
                this.props.dispatch(wirelessSocketUpdate(this.state.wirelessSocketInEdit));
                break;
        }

        this.setState({ editMode: EditMode.Null, wirelessSocketInEdit: undefined });
    }

    private validateForm = (): boolean => validateArea(this.state.wirelessSocketInEdit, this.props.state.areas)
        && validateCode(this.state.wirelessSocketInEdit)
        && validateIcon(this.state.wirelessSocketInEdit)
        && validateName(this.state.wirelessSocketInEdit);
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

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(WirelessSockets));
