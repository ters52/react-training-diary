import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Footer from "./Footer/Footer";

import './App.scss';





class App extends Component {

    constructor(props) {
        super(props);
        const data = sessionStorage.getItem(window.tokenKey);
        this.state = {
            isUserLoggedIn: data ? true : false
        }

        this.updateIsUserLoggedIn = this.updateIsUserLoggedIn.bind(this);
    }

    updateIsUserLoggedIn(value) {
        this.setState({isUserLoggedIn: value});
    }

    render() {
        return (
            <Router>
                <div className="main">
                    <Header isUserLoggedIn={this.state.isUserLoggedIn} onUpdateUserStatus={this.updateIsUserLoggedIn}/>

                    <Route exact path='/' render={(props) => (
                        <Home {...props} isUserLoggedIn={this.state.isUserLoggedIn} />
                    )}/>

                    <Route exact path='/login' render={(props) => (
                        <Login {...props}
                               isUserLoggedIn={this.state.isUserLoggedIn}
                               onUpdateUserStatus={this.updateIsUserLoggedIn} />
                    )}/>

                    <Route exact path='/register' render={(props) => (
                        <Register {...props}
                               isUserLoggedIn={this.state.isUserLoggedIn}
                               onUpdateUserStatus={this.updateIsUserLoggedIn} />
                    )}/>

                    {/*{ this.state.isUserLoggedIn &&*/}
                    {/*<TrainingDiary/> }*/}

                    {/*{ !this.state.isUserLoggedIn &&*/}
                    {/*<Login isUserLoggedIn={this.state.isUserLoggedIn}*/}
                           {/*onUpdateUserStatus={this.updateIsUserLoggedIn} /> }*/}


                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;