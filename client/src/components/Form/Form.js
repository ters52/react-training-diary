import React from "react";
import './Form.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Input = (props) => {

    return(
        <TextField
            label={props.title}
            className={props.className}
            value={props.value}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            margin="normal"
            variant="outlined"
        />

    );
};

const FormButton = (props) => {

    let dataProps = {...props};
    dataProps["className"] = "Button " + props.className;
    dataProps["variant"] = dataProps["variant"] ? dataProps["variant"] : 'contained';

    return(
        <Button {...dataProps}>
            {props.children}
        </Button>

    );
};

const Form = (props) => {

    return(
        <form action={props.action}
              className={"Form " + props.className}
              onSubmit={props.onSubmit}
              maxWidth={props.maxWidth ? props.maxWidth : ""}>
            {props.children}
        </form>
    );

};




export { Form, Input, FormButton }
