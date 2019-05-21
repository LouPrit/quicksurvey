import React, { Component } from 'react';
import '../styles/login.css';
import axios from 'axios';


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

    login(e) {
        e.preventDefault();
        axios.get(`http://localhost:3001/account/${this.state.loginForm.username}/${this.state.loginForm.password}`)
        .then(reply => console.log(reply))
        .catch(error => console.log(error));
    }
 
    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">Log in to your account</h1>

                <form className="loginForm" onSubmit={this.login}>
                    <p>~ Log in~</p>
                    <input type="text" name="username" placeholder="Username" onChange={this.textChanged} value={this.state.loginForm.username} autoComplete="off" required />
                    <input type="password" name="password" placeholder="Password" onChange={this.textChanged} value={this.state.loginForm.password} autoComplete="off" required />
                    <input type="submit" name="submit" value="Log in" />
                </form>

            </div>
        );
    }
}

export default LoginPage;