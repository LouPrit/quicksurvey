import React from "react";
import { Link } from 'react-router-dom';

function MainNav(props) {
    if (props.logState.loggedIn) {
        return (
            <div className="App-header">
            <div>
                <p className="App-title">QuickSurvey</p>
            </div>
            <nav>
                <ul className="App-nav">
                    <li>
                        <Link className="link" to="/">Surveys</Link>
                    </li>
                    <li>
                        <Link className="link" to="/mysurveys">My Surveys</Link>
                    </li>
                    <li>
                        <Link className="link" to="/createsurvey">Create Surveys</Link>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul className="App-nav-login">
                    <li>
                        <button className="logoutButton" onClick={logout}>Logout ({props.logState.username})</button>
                    </li>
                </ul>
            </nav>
        </div>
        );
    } else {
        return (
            <div className="App-header">
                <div>
                    <p className="App-title">QuickSurvey</p>
                </div>
                <nav>
                    <ul className="App-nav">
                        <li>
                            <Link className="link" to="/">Surveys</Link>
                        </li>
                        <li>
                            <Link className="link" to="/mysurveys">My Surveys</Link>
                        </li>
                        <li>
                            <Link className="link" to="/createsurvey">Create Surveys</Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <ul className="App-nav-login">
                        <li>
                            <Link className="link" to="/login">Login</Link>
                        </li>
                        <li className="signupLi">
                            <Link className="link" to="/signup">Signup</Link>
                        </li>
                    </ul>
                </nav>
            </div>);
    }
}

function logout() {
    localStorage.removeItem('qs_auth_token');
    window.location.assign("http://localhost:3000/login");
}

export default MainNav;