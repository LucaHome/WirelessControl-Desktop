import { Button, FormControl, FormControlLabel, FormGroup, TextField, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import { formStyles } from "../../constants/style.constants";
import { NextCloudCredentials } from "../../models";
import { nextCloudCredentialsLogin } from "../../store/actions";
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
            error={!this.validateNextCloudUrl()}
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
            error={!this.validateUserName()}
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
            error={!this.validatePassPhrase()}
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
                    <FormControl onSubmit={this.handleSubmit} className="login-form">
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{urlInput}</div>} />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{userNameInput}</div>} />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel label="" control={<div className="wc-full-width wc-margin-bottom-1-rem">{passPhraseInput}</div>} />
                        </FormGroup>
                        <Button disabled={!this.validateForm()} color="primary" type="submit">Login</Button>
                    </FormControl>
                </div>
            </div>
        );
    }

    private handleSubmit = (event: any) => {
        event.preventDefault();
        const nextCloudCredentials: NextCloudCredentials = {
            baseUrl: this.state.baseUrl,
            passPhrase: this.state.passPhrase,
            userName: this.state.userName,
        };
        this.props.login(nextCloudCredentials);
    }

    private handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    private validateNextCloudUrl = (): boolean => this.state.baseUrl.length > 0 && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.state.baseUrl);
    private validatePassPhrase = (): boolean => this.state.passPhrase.length > 0;
    private validateUserName = (): boolean => this.state.userName.length > 0;
    private validateForm = (): boolean => this.validateNextCloudUrl() && this.validatePassPhrase() && this.validateUserName();
}

const mapStateToProps = (state: any) => {
    return {
        nextCloudCredentials: state.nextCloudCredentials,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
        login: (nextCloudCredentials: NextCloudCredentials) => dispatch(nextCloudCredentialsLogin(nextCloudCredentials)),
    };
};

export default withStyles(formStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Login));
