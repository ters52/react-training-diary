import React, { Component } from "react";
import './Header.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class Header extends Component {

    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();
        sessionStorage.setItem(window.tokenKey, '');
        this.props.onUpdateUserStatus(false);
    }

    render() {
        return (
                <div className="Header">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className="ButtonAppBar-grow-785">
                                Training Diary
                            </Typography>
                            {this.props.isUserLoggedIn &&
                            <Button color="inherit" onClick={this.onLogoutClick}>Logout</Button>}

                        </Toolbar>
                    </AppBar>

                        { false && this.props.isUserLoggedIn &&
                        <div className="Header__menu">
                            (<ul className="Header__menuList">
                                <li className="Header__menuListItem">
                                    <a href="" onClick={this.onLogoutClick}>
                                        Logout
                                    </a>
                                </li>
                            </ul>)
                        </div>
                        }
                </div>
        );
    }
}

export default Header;