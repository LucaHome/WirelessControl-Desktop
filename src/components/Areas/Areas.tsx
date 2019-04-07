import {
    Button as MatButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";
import { Button as RsButton, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { EditMode } from "../../enums";
import { Area } from "../../models";
import { clone, maxId } from "../../utils/areas.utils";
import { areaAdd, areaAddLocal, areaDelete, areaSelectSuccessful, areaUpdate } from "../../store/actions";
import { IAreasProps } from "./IAreasProps";
import "./Areas.css";

class Areas extends React.Component<IAreasProps, any> {

    state = {
        areaInEdit: null,
        deleteDialogOpen: false,
        editMode: EditMode.Null
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
                    <ListItem button key={area.id} onClick={() => this.handleAreaSelect(area)} selected={this.isSelected(area)}>
                        <ListItemText primary={area.name} />
                        {area.deletable === 1
                            ? <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={() => this.handleAreaEdit(area)}>
                                    <EditIcon color={(this.state.areaInEdit !== null && area.id === this.state.areaInEdit.id) ? "secondary" : "primary"} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null}
                    </ListItem>
                ))}
            </List>
            : <List></List>

        let idInput = <Input disabled type="text" name="name" id="name" value={this.areaSelected.id} />;

        let nameInput = <div></div>;
        let nameFormFeedback = <div></div>;

        let filterInput = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.areaSelected !== null) {
            if ((this.state.areaInEdit !== null && this.areaSelected.id === this.state.areaInEdit.id) && this.areaSelected.deletable === 1) {
                if (!this.validateName()) {
                    nameInput = <Input invalid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleAreaChange} value={this.state.areaInEdit.name} />;
                    nameFormFeedback = <FormFeedback>Invalid name</FormFeedback>;
                } else {
                    nameInput = <Input valid type="text" name="name" id="name" placeholder="Enter a name" onChange={this.handleAreaChange} value={this.state.areaInEdit.name} />;
                }

                filterInput = <Input disabled type="text" name="filter" id="filter" value={this.state.areaInEdit.filter} />;

                submitButton = <RsButton className="area-button-submit" disabled={!this.validateForm()} type="submit">Save</RsButton>;
                cancelEditButton = <RsButton className="area-button-submit" type="button" onClick={() => this.setState({ areaInEdit: null })}>Cancel</RsButton>;
                deleteButton = <RsButton className="area-button-delete" type="button" color="danger" onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</RsButton>;
            } else {
                nameInput = <Input disabled type="text" name="name" id="name" value={this.areaSelected.name} />;
                filterInput = <Input disabled type="text" name="filter" id="filter" value={this.areaSelected.filter} />;
            }
        }

        return <div>
            <div className="area-list-container">
                {areaList}
            </div>
            <div className="area-form-container">
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
                        <Label for="filter">Filter</Label>
                        {filterInput}
                    </FormGroup>
                    {submitButton}
                    {cancelEditButton}
                    {deleteButton}
                </Form>
            </div>
            <Fab color="primary" aria-label="Add" className="area-button-add" onClick={this.handleAreaAdd}>
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
                    <MatButton onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>Cancel</MatButton>
                    <MatButton onClick={this.handleDelete} color="secondary">Delete</MatButton>
                </DialogActions>
            </Dialog>
        </div>;
    }

    private handleAreaSelect = (area: Area): void => this.props.dispatch(areaSelectSuccessful(area));
    private isSelected = (area: Area): boolean => this.areaSelected !== null && this.areaSelected.id === area.id;

    private handleAreaAdd = (): void => {
        const area: Area = {
            id: maxId(this.props.state.areas) + 1,
            name: "",
            filter: "",
            deletable: 1,
        };
        this.props.dispatch(areaAddLocal(area));
        this.setState({
            areaInEdit: area,
            editMode: EditMode.Add
        });
    };

    private handleAreaEdit = (area: Area): void => {
        this.props.dispatch(areaSelectSuccessful(area));
        this.setState({
            areaInEdit: clone(area),
            editMode: EditMode.Edit
        });
    };
    private handleAreaChange = (event) => {
        const area: Area = this.state.areaInEdit;
        area.name = event.target.value;
        area.filter = event.target.value;
        this.setState({ areaInEdit: clone(area) });
    };

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
            editMode: EditMode.Null
        });
    };
    private validateName = (): boolean => this.state.areaInEdit !== null && (this.state.areaInEdit.deletable === 0 || this.state.areaInEdit.name.length > 0);
    private validateForm = (): boolean => this.validateName();

    private handleDelete = (): void => {
        this.props.dispatch(areaDelete(this.state.areaInEdit));
        this.setState({ areaInEdit: null, deleteDialogOpen: false });
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(Areas);
