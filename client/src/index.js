import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";


const rootElement = document.getElementById('root');

window.ApiBase = "https://trainingdiary.tk/api/";
window.tokenKey = "user_token";


ReactDOM.render(
        <App />,
    rootElement
);


