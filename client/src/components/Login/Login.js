import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
// import { Form, Input, FormButton } from "../Form/Form";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
// import Container from '@material-ui/core/Container';

import './Login.scss';






export default function Login(props) {

    const [state, setState] = useState({
        email : "",
        password : "",
        success: null
    });

    const useStyles = makeStyles({
        '@global': {
            body: {
                backgroundColor: '#fff',
            },
        },
        paper: {
            marginTop: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: '5px',
        },
        submit: {
            margin: '5px',
        },
    });



    let onFormSubmit = (e) => {
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
                        props.onUpdateUserStatus(true);
                    } else {
                        setState({success: false});
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

    let onFieldChange = (e) => {
        setState({
            [e.target.name] : e.target.value
        });
    }


    const classes = useStyles();

    return(
            <div className="Login">
                {/*<Container component="main" maxWidth="xs">*/}
                    <CssBaseline />
                    <div className={classes.paper}>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        { props.isUserLoggedIn && <Redirect to="/"/>}

                        { state.success === false &&
                        <p className="Login_IncorrectMessage">Incorrect email or password</p>}
                        <form className={classes.form} onSubmit={onFormSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                onChange={onFieldChange}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={onFieldChange}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component={RouterLink} to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                {/*</Container>*/}



                {/*<Form action="" className="Login__Form" onSubmit={this.onFormSubmit} maxWidth="xs">*/}
                {/*    <br/>*/}
                {/*    <Input title=" Email:"*/}
                {/*           className="LoginForm__UserEmail"*/}
                {/*           value={this.state.email}*/}
                {/*           type="text"*/}
                {/*           onChange={this.onFieldChange}*/}
                {/*           name="email"/>*/}
                {/*    <br/>*/}
                {/*    <Input title="Password:"*/}
                {/*           className="LoginForm__Password"*/}
                {/*           value={this.state.password}*/}
                {/*           type="password"*/}
                {/*           onChange={this.onFieldChange}*/}
                {/*           name="password"/>*/}
                {/*    <br/>*/}
                {/*    <div className={""}>*/}
                {/*        <div className="LoginForm__ButtonContainer">*/}
                {/*            <FormButton type="submit"*/}
                {/*                // title=""*/}
                {/*                // className="LoginForm__Button"*/}
                {/*                        variant="contained"*/}
                {/*                        color="primary"*/}
                {/*                        size="large"*/}
                {/*            >*/}
                {/*                Log in*/}
                {/*            </FormButton>*/}
                {/*        </div>*/}
                {/*        <div className="LoginForm__ButtonContainer">*/}
                {/*            <FormButton component={Link}*/}
                {/*                        to="/register"*/}
                {/*                        variant="contained"*/}
                {/*                        href="#contained-buttons"*/}
                {/*                        size="large">*/}
                {/*                Register*/}
                {/*            </FormButton>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</Form>*/}
            </div>
    );
};