import { cloneDeep, max } from "lodash/fp";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormControlLabel,
    FormGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography, withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";

import { formStyles } from "../../constants/style.constants";
import { EditMode } from "../../enums";
import { IEntityProps } from "../../interfaces";
import { Area } from "../../models";
import { areaAdd, areaAddLocal, areaDelete, areaSelectSuccessful, areaUpdate } from "../../store/actions";
import { validate } from "../../utils/area.utils";

class Areas extends React.Component<IEntityProps<Area>, any> {

    public state: any = {
        areaInEdit: undefined,
        deleteDialogOpen: false,
        editMode: EditMode.Null,
    };

    private areas: Area[] = [];

    private areaSelected: Area = undefined;

    constructor(props: IEntityProps<Area>) {
        super(props);
    }

    public render() {
        this.areas = this.props.state.areas;
        this.areaSelected = this.props.state.areaSelected;

        if (!this.areas.some((area: Area) => this.areaSelected !== undefined && area.id === this.areaSelected.id)) {
            this.handleSelect(this.areas.length > 0 ? this.areas[0] : undefined);
        }

        const areaList: JSX.Element = this.areas.length > 0
            ? <List>
                {this.areas.map((area: Area, _) => (
                    <ListItem button key={area.id} onClick={() => this.handleSelect(area)} selected={this.isSelected(area)}>
                        <ListItemText primary={area.name} />
                        {area.deletable === 1
                            ? <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={() => this.handleEdit(area)}>
                                    <EditIcon color={(this.state.areaInEdit !== undefined && area.id === this.state.areaInEdit.id) ? "secondary" : "primary"} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : undefined}
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        let idInput: JSX.Element = <div></div>;
        let nameInput: JSX.Element = <div></div>;
        let filterInput: JSX.Element = <div></div>;

        let submitButton: JSX.Element = <div></div>;
        let cancelEditButton: JSX.Element = <div></div>;
        let deleteButton: JSX.Element = <div></div>;

        if (this.areaSelected !== undefined) {
            const canBeEdited: boolean = (this.state.areaInEdit !== undefined && this.areaSelected.id === this.state.areaInEdit.id) && this.areaSelected.deletable === 1;

            idInput = <TextField
                fullWidth
                disabled
                label="Id"
                type="text"
                name="id"
                id="id"
                value={this.areaSelected.id}
                variant="outlined" />;

            nameInput = <TextField
                error={!validate(this.state.areaInEdit)}
                disabled={!canBeEdited}
                fullWidth
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="Enter a name"
                onChange={this.handleChange}
                value={canBeEdited ? this.state.areaInEdit.name : this.areaSelected.name}
                variant="outlined" />;

            filterInput = <TextField
                fullWidth
                disabled
                label="Filter"
                type="text"
                name="filter"
                id="filter"
                value={canBeEdited ? this.state.areaInEdit.filter : this.areaSelected.filter}
                variant="outlined" />;

            submitButton = canBeEdited
                ? <Button
                    className="wc-button-submit"
                    disabled={!validate(this.state.areaInEdit)}
                    type="button"
                    color="primary"
                    onClick={this.handleSubmit}>Save</Button>
                : <div></div>;

            cancelEditButton = canBeEdited
                ? <Button
                    className="wc-button-submit"
                    type="button"
                    color="primary"
                    onClick={() => this.setState({ areaInEdit: undefined })}>Cancel</Button>
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
            <Typography className="wc-full-width" variant="h5" gutterBottom>Wireless Control</Typography>
            <div className="wc-list-container">
                {areaList}
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
                            <FormControlLabel label="" control={<div className="wc-full-width">{filterInput}</div>} />
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
                <DialogTitle id="alert-dialog-title">{"Delete the selected area?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this area, all associated wireles sockets and periodic tasks will be deleted. This cannot be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>Cancel</Button>
                    <Button onClick={this.handleDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>;
    }

    private isSelected = (area: Area): boolean => this.areaSelected !== undefined && this.areaSelected.id === area.id;

    private handleAdd = (): void => {
        const area: Area = {
            deletable: 1,
            filter: "",
            id: max<number>(this.props.state.areas.map((area: Area) => area.id)) + 1,
            name: "",
        };
        this.props.dispatch(areaAddLocal(area));
        this.setState({ areaInEdit: area, editMode: EditMode.Add });
    }

    private handleChange = (event: any): void => {
        const area: Area = this.state.areaInEdit;
        area.name = event.target.value;
        area.filter = event.target.value;
        this.setState({ areaInEdit: cloneDeep(area) });
    }

    private handleDelete = (): void => {
        this.props.dispatch(areaDelete(this.state.areaInEdit));
        this.setState({ areaInEdit: undefined, deleteDialogOpen: false });
    }

    private handleEdit = (area: Area): void => {
        this.props.dispatch(areaSelectSuccessful(area));
        this.setState({ areaInEdit: cloneDeep(area), editMode: EditMode.Edit });
    }

    private handleSelect = (area: Area): void => this.props.dispatch(areaSelectSuccessful(area));

    private handleSubmit = (event: any): void => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(areaAdd(this.state.areaInEdit));
                break;
            case EditMode.Edit:
                this.props.dispatch(areaUpdate(this.state.areaInEdit));
                break;
        }

        this.setState({ areaInEdit: undefined, editMode: EditMode.Null });
    }
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

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Areas));
