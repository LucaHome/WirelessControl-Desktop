import { Button, FormControl, FormControlLabel, FormGroup, TextField, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { formStyles } from "../../constants/style.constants";
import { NextCloudCredentials } from "../../models";
import { nextCloudCredentialsLogin } from "../../store/actions";
import { validateNextCloudUrl, validatePassPhrase, validateUserName } from "../../utils/login.utils";
import { ILoginProps } from "./ILoginProps";

import "./Login.scss";

class Login extends React.Component<ILoginProps, any> {

    constructor(props: ILoginProps) {
        super(props);

        this.state = {
            baseUrl: props.nextCloudCredentials ? props.nextCloudCredentials.baseUrl : "",
            passPhrase: props.nextCloudCredentials ? props.nextCloudCredentials.passPhrase : "",
            userName: props.nextCloudCredentials ? props.nextCloudCredentials.userName : "",
        };
    }

    public render() {
        const urlInput = <TextField
            error={!validateNextCloudUrl(this.state.baseUrl)}
            fullWidth
            label="Url"
            type="url"
            name="baseUrl"
            id="baseUrl"
            placeholder="Enter your server address"
            onChange={this.handleChange}
            value={this.state.baseUrl}
            variant="outlined"
        />;

        const userNameInput = <TextField
            error={!validateUserName(this.state.userName)}
            fullWidth
            label="UserName"
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your user name"
            onChange={this.handleChange}
            value={this.state.userName}
            variant="outlined"
        />;

        const passPhraseInput = <TextField
            error={!validatePassPhrase(this.state.passPhrase)}
            fullWidth
            label="Password"
            type="password"
            name="passPhrase"
            id="passPhrase"
            placeholder="Enter your password"
            onChange={this.handleChange}
            value={this.state.passPhrase}
            variant="outlined"
        />;

        return (
            <div>
                <div className="login-container">
                    <img className="login-image" src="../assets/images/logo.png"></img>
                </div>
                <div className="login-container">
                    <FormControl className="login-form">
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{urlInput}</div>} />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{userNameInput}</div>} />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{passPhraseInput}</div>} />
                        </FormGroup>
                        <Button disabled={!this.validateForm()} color="primary" type="button" onClick={this.handleSubmit}>Login</Button>
                    </FormControl>
                </div>
            </div>
        );
    }

    private handleChange = (event: any): void => {
        this.setState({ [event.target.id]: event.target.value });
    }

    private handleSubmit = (event: any): void => {
        event.preventDefault();
        const nextCloudCredentials: NextCloudCredentials = {
            baseUrl: this.state.baseUrl,
            passPhrase: this.state.passPhrase,
            userName: this.state.userName,
        };
        this.props.login(nextCloudCredentials);
    }

    private validateForm = (): boolean => validateNextCloudUrl(this.state.baseUrl)
        && validatePassPhrase(this.state.passPhrase)
        && validateUserName(this.state.userName);
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
        login: (nextCloudCredentials: NextCloudCredentials) => dispatch(nextCloudCredentialsLogin(nextCloudCredentials)),
    };
};

const mapStateToProps = (state: any) => {
    return {
        nextCloudCredentials: state.nextCloudCredentials,
    };
};

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Login));
