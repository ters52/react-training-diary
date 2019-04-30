import React, { Component } from "react";
import './Header.scss';


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
            <div>
                <div className="Header">
                    <div className="Header__logoContainer">
                        <h1 className="Header__title">Training Diary</h1>
                    </div>
                    <div className="Header__menu">
                        { this.props.isUserLoggedIn &&
                            (<ul className="Header__menuList">
                                <li className="Header__menuListItem">
                                    <a href="" onClick={this.onLogoutClick}>
                                        Logout
                                    </a>
                                </li>
                            </ul>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;