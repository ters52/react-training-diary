import React, { Component } from "react";

class HeaderOld extends Component {
    render() {
        return (
            <div>
                <div className="Header">
                    <div className="Header__logoContainer">
                        <h1>Training Diary</h1>
                    </div>
                    <div className="Header__menu">
                        <ul className="Header__menuList">
                            <li className="Header__menuListItem">
                                <a href="Header__menuListLink Header__logIn">
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;