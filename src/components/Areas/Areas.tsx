import {
    Button as MatButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { connect } from "react-redux";
import { Button as RsButton, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { Area } from "../../models";
import { areaDelete, areaSelectSuccessful, areaUpdate } from "../../store/actions";
import { IAreasProps } from "./IAreasProps";
import "./Areas.css";

class Areas extends React.Component<IAreasProps, any> {

    state = {
        areaInEdit: null,
        deleteDialogOpen: false,
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
                                    <EditIcon color={area === this.state.areaInEdit ? "secondary" : "primary"} />
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
        let filterFormFeedback = <div></div>;

        let submitButton = <div></div>;
        let cancelEditButton = <div></div>;
        let deleteButton = <div></div>;

        if (this.areaSelected !== null) {
            if (this.areaSelected === this.state.areaInEdit && this.areaSelected.deletable === 1) {
                if (!this.validateName()) {
                    nameInput = <Input invalid type="text" name="name" id="name" placeholder="Enter a name" onChange={(event) => this.state.areaInEdit.name = event.target.value} value={this.state.areaInEdit.name} />;
                    nameFormFeedback = <FormFeedback>Invalid name</FormFeedback>;
                } else {
                    nameInput = <Input valid type="text" name="name" id="name" placeholder="Enter a name" onChange={(event) => this.state.areaInEdit.name = event.target.value} value={this.state.areaInEdit.name} />;
                }

                if (!this.validateFilter()) {
                    filterInput = <Input invalid type="text" name="filter" id="filter" placeholder="Enter a filter" onChange={(event) => this.state.areaInEdit.filter = event.target.value} value={this.state.areaInEdit.filter} />;
                    filterFormFeedback = <FormFeedback>Invalid name</FormFeedback>;
                } else {
                    filterInput = <Input valid type="text" name="filter" id="filter" placeholder="Enter a filter" onChange={(event) => this.state.areaInEdit.filter = event.target.value} value={this.state.areaInEdit.filter} />;
                }

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
                        {filterFormFeedback}
                    </FormGroup>
                    {submitButton}
                    {cancelEditButton}
                    {deleteButton}
                </Form>
            </div>
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

    private handleAreaEdit = (area: Area): void => {
        this.props.dispatch(areaSelectSuccessful(area));
        this.setState({ areaInEdit: area });
    };

    private handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(areaUpdate(this.state.areaInEdit));
        this.setState({ areaInEdit: null });
    };
    private validateName = (): boolean => this.areaSelected !== null && (this.areaSelected.deletable === 0 || this.areaSelected.name.length > 0);
    private validateFilter = (): boolean => this.areaSelected !== null && (this.areaSelected.deletable === 0 || this.areaSelected.filter.length > 0);
    private validateForm = (): boolean => this.validateName() && this.validateFilter();

    private handleDelete = (): void => {
        this.props.dispatch(areaDelete(this.areaSelected));
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
