import React from "react";
import './Form.scss';


const Input = (props) => {
    return(
        <div className={"Input " + props.className}>
            <label htmlFor={props.name} className={"Input__label " + props.className + "__label"}>{props.title}</label>
            <input type={props.type}
                   name={props.name}
                   className={"Input__field " + props.className + "__field"}
                   onChange={props.onChange}
                   value={props.value}/>
        </div>

    );
};

const Button = (props) => {

    let dataProps = {...props};
    dataProps["className"] = "Button " + props.className;
    delete dataProps["title"];


    return(
        <button {...dataProps}>
            {props.title}
        </button>
    );
};

const Form = (props) => {

    return(
        <form action={props.action}
              className={"Form " + props.className}
              onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );

};




export { Form, Input, Button }
