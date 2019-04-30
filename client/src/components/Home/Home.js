import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TrainingDiary from "../TrainingDiary/TraningDiary";

import './Home.scss';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="Home">
                {this.props.isUserLoggedIn &&
                <TrainingDiary isUserLoggedIn={this.props.isUserLoggedIn} />}

                {!this.props.isUserLoggedIn &&
                <Redirect to="/login" /> }

            </div>
        );
    }
}

export default Home;