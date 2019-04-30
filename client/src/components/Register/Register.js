import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "../Form/Form.js";

import './Register.scss';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : ""
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();

        var form = new FormData(e.target);
        console.log();

        fetch(window.ApiBase + "register", {
            method: "POST",
            body: form

        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result && result.jwt && result.jwt.length > 0) {
                        sessionStorage.setItem(window.tokenKey, result.jwt);
                        this.props.onUpdateUserStatus(true);

                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )

    }

    onFieldChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        return(
            <div className="Register">
                { this.props.isUserLoggedIn && <Redirect to="/"/>}
                <h1>Login</h1>

                <Form action="" className="Register__Form" onSubmit={this.onFormSubmit}>
                    <br/>
                    <Input title=" Email:"
                           className="RegisterForm__UserEmail"
                           value={this.state.email}
                           type="text"
                           onChange={this.onFieldChange}
                           name="email"/>
                    <br/>
                    <br/>
                    <Input title="Password:"
                           className="RegisterForm__Password"
                           value={this.state.password}
                           type="password"
                           onChange={this.onFieldChange}
                           name="password"/>
                    <br/>
                    <br/>
                    <Button type="submit"
                            title="Register"
                            className="RegisterForm__Submit"/>
                </Form>
            </div>
        );
    }
}
export default Register;