import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button } from "../Form/Form";


import './Login.scss';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : "",
            success: null
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();

        var form = new FormData(e.target);
        console.log();

        fetch(window.ApiBase + "login", {
            method: "POST",
            body: form

        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result && result.jwt && result.jwt.length > 0) {
                        sessionStorage.setItem(window.tokenKey, result.jwt);
                        this.props.onUpdateUserStatus(true);
                    } else {
                        this.setState({success: false});
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
            <div className="Login">
                { this.props.isUserLoggedIn && <Redirect to="/"/>}
                <h1>Login</h1>
                { this.state.success === false &&
                <p className="Message_FailedLogin">Incorrect email or password</p>}

                <Form action="" className="Login__Form" onSubmit={this.onFormSubmit}>
                    <br/>
                    <Input title=" Email:"
                           className="LoginForm__UserEmail"
                           value={this.state.email}
                           type="text"
                           onChange={this.onFieldChange}
                           name="email"/>
                    <br/>
                    <br/>
                    <Input title="Password:"
                           className="LoginForm__Password"
                           value={this.state.password}
                           type="password"
                           onChange={this.onFieldChange}
                           name="password"/>
                    <br/>
                    <Button type="submit"
                            title="Log in"
                            className="LoginForm__Submit"/>
                    <br/>
                    <Link to="/register">Register</Link>
                </Form>
            </div>
        );
    }
}
export default Login;