import * as React from "react";
import { connect } from "react-redux";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { NextCloudCredentials } from "../../models";
import { nextCloudCredentialsLogin } from "../../store/actions";
import { ILoginProps } from "./ILoginProps";
import "./Login.css";

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
        let urlInput;
        let urlFormFeedback;
        if (!this.validateNextCloudUrl()) {
            urlInput = <Input invalid type="url" name="baseUrl" id="baseUrl" placeholder="Enter your server address" onChange={this.handleChange} value={this.state.baseUrl} />;
            urlFormFeedback = <FormFeedback>Invalid Url</FormFeedback>;
        } else {
            urlInput = <Input valid type="url" name="baseUrl" id="baseUrl" placeholder="Enter your server address" onChange={this.handleChange} value={this.state.baseUrl} />;
            urlFormFeedback = <div></div>;
        }

        let userNameInput;
        let userNameformFeedback;
        if (!this.validateUserName()) {
            userNameInput = <Input invalid type="text" name="userName" id="userName" placeholder="Enter your user name" onChange={this.handleChange} value={this.state.userName} />;
            userNameformFeedback = <FormFeedback>Invalid user name</FormFeedback>;
        } else {
            userNameInput = <Input valid type="text" name="userName" id="userName" placeholder="Enter your user name" onChange={this.handleChange} value={this.state.userName} />;
            userNameformFeedback = <div></div>;
        }

        let passPhraseInput;
        let passPhraseFormFeedback;
        if (!this.validatePassPhrase()) {
            passPhraseInput = <Input invalid type="password" name="passPhrase" id="passPhrase" placeholder="Enter your password" onChange={this.handleChange} value={this.state.passPhrase} />;
            passPhraseFormFeedback = <FormFeedback>Invalid password</FormFeedback>;
        } else {
            passPhraseInput = <Input valid type="password" name="passPhrase" id="passPhrase" placeholder="Enter your password" onChange={this.handleChange} value={this.state.passPhrase} />;
            passPhraseFormFeedback = <div></div>;
        }

        return (
            <div className="Login">
                <img src="../assets/images/logo.png"></img>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="baseUrl">NextCloudUrl</Label>
                        {urlInput}
                        {urlFormFeedback}
                    </FormGroup>
                    <FormGroup>
                        <Label for="userName">UserName</Label>
                        {userNameInput}
                        {userNameformFeedback}
                    </FormGroup>
                    <FormGroup>
                        <Label for="passPhrase">Password</Label>
                        {passPhraseInput}
                        {passPhraseFormFeedback}
                    </FormGroup>
                    <Button disabled={!this.validateForm()} type="submit">Login</Button>
                </Form>
            </div>
        );
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        const nextCloudCredentials: NextCloudCredentials = {
            baseUrl: this.state.baseUrl,
            passPhrase: this.state.passPhrase,
            userName: this.state.userName,
        };
        this.props.login(nextCloudCredentials);
    }

    private handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    private validateNextCloudUrl(): boolean {
        return this.state.baseUrl.length > 0;
    }

    private validatePassPhrase(): boolean {
        return this.state.passPhrase.length > 0;
    }

    private validateUserName(): boolean {
        return this.state.userName.length > 0;
    }

    private validateForm(): boolean {
        return this.validateNextCloudUrl() && this.validatePassPhrase() && this.validateUserName();
    }
}

const mapStateToProps = (state) => {
    return {
        nextCloudCredentials: state.nextCloudCredentials,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        login: (nextCloudCredentials: NextCloudCredentials) => dispatch(nextCloudCredentialsLogin(nextCloudCredentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
