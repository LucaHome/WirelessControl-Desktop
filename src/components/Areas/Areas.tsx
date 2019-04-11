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
import { Area } from "../../models";
import { areaAdd, areaAddLocal, areaDelete, areaSelectSuccessful, areaUpdate } from "../../store/actions";
import { clone, maxId } from "../../utils/entity.utils";
import { IAreasProps } from "./IAreasProps";

class Areas extends React.Component<IAreasProps, any> {

    public state = {
        areaInEdit: null,
        deleteDialogOpen: false,
        editMode: EditMode.Null,
    };

    private areas: Area[] = [];
    private areaSelected: Area = null;

    constructor(props: IAreasProps) {
        super(props);
    }

    public render() {
        this.areas = this.props.state.areas;
        this.areaSelected = this.props.state.areaSelected;

        const areaList = this.areas.length > 0
            ? <List>
                {this.areas.map((area: Area, _) => (
                    <ListItem button key={area.id} onClick={() => this.handleSelect(area)} selected={this.isSelected(area)}>
                        <ListItemText primary={area.name} />
                        {area.deletable === 1
                            ? <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={() => this.handleEdit(area)}>
                                    <EditIcon color={(this.state.areaInEdit !== null && area.id === this.state.areaInEdit.id) ? "secondary" : "primary"} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null}
                    </ListItem>
                ))}
            </List>
            : <List></List>;

        const idInput = <TextField fullWidth disabled label="Id" type="text" name="id" id="id" value={this.areaSelected.id} variant="outlined" />;
        let nameInput = <div></div>;
        let filterInput = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.areaSelected !== null) {
            if ((this.state.areaInEdit !== null && this.areaSelected.id === this.state.areaInEdit.id) && this.areaSelected.deletable === 1) {
                if (!this.validateName()) {
                    nameInput = <TextField error fullWidth label="Name" type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.areaInEdit.name} />;
                } else {
                    nameInput = <TextField fullWidth label="Name" type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleChange} value={this.state.areaInEdit.name} />;
                }

                filterInput = <TextField fullWidth disabled label="Filter" type="text" name="filter" id="filter" value={this.state.areaInEdit.filter} />;

                submitButton = <Button className="wc-button-submit" disabled={!this.validateForm()} type="submit" color="primary">Save</Button>;
                cancelEditButton = <Button className="wc-button-submit" type="button" color="primary" onClick={() => this.setState({ areaInEdit: null })}>Cancel</Button>;
                deleteButton = <Button className="wc-button-delete" type="button" color="secondary" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</Button>;
            } else {
                nameInput = <TextField fullWidth disabled label="Name" type="text" name="name" id="name" value={this.areaSelected.name} variant="outlined" />;
                filterInput = <TextField fullWidth disabled label="Filter" type="text" name="filter" id="filter" value={this.areaSelected.filter} variant="outlined" />;
            }
        }

        return <div>
            <Typography className="wc-full-width" component="h5" variant="h5" gutterBottom>Wireless Control</Typography>
            <div className="wc-list-container">
                {areaList}
            </div>
            <div className="wc-form-container">
                <div className={this.props.classes.root}>
                    <FormControl fullWidth onSubmit={this.handleSubmit} className={this.props.classes.formControl}>
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

    private handleSelect = (area: Area): void => this.props.dispatch(areaSelectSuccessful(area));
    private isSelected = (area: Area): boolean => this.areaSelected !== null && this.areaSelected.id === area.id;

    private handleAdd = (): void => {
        const area: Area = {
            deletable: 1,
            filter: "",
            id: maxId(this.props.state.areas) + 1,
            name: "",
        };
        this.props.dispatch(areaAddLocal(area));
        this.setState({
            areaInEdit: area,
            editMode: EditMode.Add,
        });
    }

    private handleEdit = (area: Area): void => {
        this.props.dispatch(areaSelectSuccessful(area));
        this.setState({
            areaInEdit: clone(area),
            editMode: EditMode.Edit,
        });
    }

    private handleChange = (event) => {
        const area: Area = this.state.areaInEdit;
        area.name = event.target.value;
        area.filter = event.target.value;
        this.setState({ areaInEdit: clone(area) });
    }

    private handleSubmit = (event) => {
        event.preventDefault();

        switch (this.state.editMode) {
            case EditMode.Add:
                this.props.dispatch(areaAdd(this.state.areaInEdit));
                break;
            case EditMode.Edit:
                this.props.dispatch(areaUpdate(this.state.areaInEdit));
                break;
        }

        this.setState({
            areaInEdit: null,
            editMode: EditMode.Null,
        });
    }

    private validateName = (): boolean => this.state.areaInEdit !== null && (this.state.areaInEdit.deletable === 0 || this.state.areaInEdit.name.length > 0);
    private validateForm = (): boolean => this.validateName();

    private handleDelete = (): void => {
        this.props.dispatch(areaDelete(this.state.areaInEdit));
        this.setState({ areaInEdit: null, deleteDialogOpen: false });
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

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Areas));
