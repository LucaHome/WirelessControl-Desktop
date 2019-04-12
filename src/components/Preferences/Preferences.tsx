import { FormControl, FormGroup, FormLabel, MenuItem, OutlinedInput, Select, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { formStyles } from "../../constants/style.constants";
import { AppTheme } from "../../enums";
import { loadAppThemeFromStore, saveAppThemeInStore } from "../../services/storage.service";
import { saveTheme } from "../../store/actions";
import { IPreferencesProps } from "./IPreferencesProps";

import "./Preferences.scss";

class Preferences extends React.Component<IPreferencesProps, any> {

    public state = {
        theme: loadAppThemeFromStore(),
    };

    constructor(props: IPreferencesProps) {
        super(props);
    }

    public render() {
        return <div className="preferences-container">
            <FormControl>
                <FormLabel component="label">Theme</FormLabel>
                <FormGroup>
                    <Select
                        fullWidth
                        value={this.state.theme}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                id="theme"
                                labelWidth={0}
                                name="theme"
                            />
                        } >
                        <MenuItem value={AppTheme.Dark}>{AppTheme.Dark}</MenuItem>
                        <MenuItem value={AppTheme.Light}>{AppTheme.Light}</MenuItem>
                    </Select>
                </FormGroup>
            </FormControl>
        </div>;
    }

    private handleChange = (event: any): void => {
        const theme: AppTheme = event.target.value;
        this.setState({ theme: theme });
        saveAppThemeInStore(theme);
        this.props.dispatch(saveTheme(`Saved new theme ${theme}. Restart application to use new theme.`));
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

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Preferences));
