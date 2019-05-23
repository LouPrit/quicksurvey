import React, { Component } from 'react';
import '../styles/login.css';
import axios from 'axios';
import decode from 'jwt-decode'


class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                username: '',
                password: ''
            }
        };

        this.textChanged = this.textChanged.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        document.title = "Log in to your account";
    }

    textChanged(e) {
        const name = e.target.name;
        this.setState(
            {
                loginForm: Object.assign({}, this.state.loginForm, { [name]: e.target.value })
            }
        );
    }

    verifyToken() {
        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        if (token) {
            const decoded = decode(token); //Decode our token
            if (decoded.exp > Date.now() / 1000) { //If the token expiry date is greater than current time/date the token is valid
                return decoded.username;
            } else {  //Otherwise it's not valid
                return false;
            }
        } else {
            return false;
        }
    }


    login(e) {
        e.preventDefault();
        axios.get(`http://localhost:3001/account/${this.state.loginForm.username}/${this.state.loginForm.password}`)
            .then(reply => {
                if (reply.data.token) { //If token exists in reply
                    localStorage.setItem('qs_auth_token', reply.data.token); //Store token in local storage with the name 'qs_auth_token'
                    const verified = this.verifyToken(); //Verify token is valid
                    if (verified) {
                        console.log("Logging in");
                        this.props.setLogInState(true, verified);
                        this.setState({
                            loginForm: {
                                username: '',
                                password: ''
                            }
                        });
                        window.location.assign("http://localhost:3000/mysurveys");
                    } else {
                        console.log("Error: Looks like token was invalid");
                    }
                } else if (reply.data.disabled) { //If account is disabled
                    alert("Account disabled");
                } else { //If no token is in the reply than the username or password is incorrect
                    alert("Incorrect Username or Password");
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">Log in to your account</h1>

                <form className="loginForm" onSubmit={this.login}>
                    <p>~ Log in~</p>
                    <input className="loginInput" type="text" name="username" placeholder="Username" onChange={this.textChanged} value={this.state.loginForm.username} autoComplete="off" required />
                    <input className="loginInput" type="password" name="password" placeholder="Password" onChange={this.textChanged} value={this.state.loginForm.password} autoComplete="off" required />
                    <input className="loginInput btn btn-dark" type="submit" name="submit" value="Log in" />
                </form>

            </div>
        );
    }
}

export default LoginPage;