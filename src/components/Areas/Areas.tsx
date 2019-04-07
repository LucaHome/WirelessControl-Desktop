import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { Area } from "../../models";
import { areaSelectSuccessful } from "../../store/actions";
import { IAreasProps } from "./IAreasProps";

class Areas extends React.Component<IAreasProps, any> {

    constructor(props: IAreasProps) {
        super(props);
    }

    public render() {
        const areas: Area[] = this.props.state.areas;

        const areaList = areas.length > 0
            ? <List>
                {areas.map((area: Area, _) => (
                    <ListItem button key={area.id} onClick={() => this.handleAreaSelect(area)} selected={this.isSelected(area)}>
                        <ListItemText primary={area.name} />
                    </ListItem>
                ))}
            </List>
            : <List></List>

        return <div>
            {areaList}
        </div>;
    }

    private handleAreaSelect = (area: Area): void => this.props.dispatch(areaSelectSuccessful(area));
    private isSelected = (area: Area): boolean => this.props.state.areaSelected.id === area.id;
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
