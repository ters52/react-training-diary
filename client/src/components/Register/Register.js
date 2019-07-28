import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import './Register.scss';



export default function Register(props) {

    const useStyles = makeStyles({
        '@global': {
            body: {
                backgroundColor: "#fff",
            },
        },
        paper: {
            marginTop: "5px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: "5px",
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: "5px",
        },
        submit: {
            margin: "5px",
        },
    });


    const classes = useStyles();

    const [state, setState] = useState({
        email : "",
        password : ""
    });

    let onFormSubmit = (e) => {
        e.preventDefault();

        var form = new FormData(e.target);

        fetch(window.ApiBase + "register", {
            method: "POST",
            body: form

        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result && result.jwt && result.jwt.length > 0) {
                        sessionStorage.setItem(window.tokenKey, result.jwt);
                        props.onUpdateUserStatus(true);

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


    return (
        <div className="Register">
                <CssBaseline />
                { props.isUserLoggedIn && <Redirect to="/"/>}
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} spacing={2}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} spacing={2}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12} spacing={2}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} spacing={2}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
        </div>
    );
}


