import React, { Component } from 'react';
import '../styles/signup.css';
import axios from 'axios';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accForm: {
                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: ''
            }
        };

        //binds
        this.textChanged = this.textChanged.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    textChanged(e) {
        const name = e.target.name;
        this.setState(
            {
                accForm: Object.assign({}, this.state.accForm, { [name]: e.target.value })
            }
        );
    }


    handleSubmit(e) {
        e.preventDefault(); //Prevent the form from refreshing page when submit is pressed
        alert(JSON.stringify(this.state.accForm));
    }

    /**
    * Saves our new account to the database
    */
    createAccount(e) {
        e.preventDefault(); //Prevent the form from refreshing page when submit is pressed
        axios.post('http://localhost:3001/account/', (this.state.accForm))
            .then((res) => {
                let reply = res.data;

                if (reply.exists) {
                    if (reply.username === this.state.accForm.username) {
                        alert("Username already registered");
                    }
                    else if (reply.email === this.state.accForm.email) {
                        alert("Email already registered");
                    }
                } else {
                console.log("Account successfully created");
                console.log(res)
                this.setState ({
                    accForm: {
                        username: '',
                        password: '',
                        email: '',
                        firstName: '',
                        lastName: ''
                    }
                });
                alert("Account successfully created");
            }
            })
            .catch((error) => {
                console.error(error)
            })
    }


    render() {
        return (
            <div className="App-main">
                <h1 id="heading">Create your free account</h1>
                <h2>Already have account? <a href="login">Log In</a></h2>

                <form className="signupForm" onSubmit={this.createAccount}>
                    <p>~ Create an account ~</p>
                    <input type="text" name="username" placeholder="Username" onChange={this.textChanged} value={this.state.accForm.username} autoComplete="off" required />
                    <input type="password" name="password" placeholder="Password" onChange={this.textChanged} value={this.state.accForm.password} autoComplete="off" required />
                    <input type="email" name="email" placeholder="Email" onChange={this.textChanged} value={this.state.accForm.email} autoComplete="on" required />
                    <input type="text" name="firstName" placeholder="First Name" onChange={this.textChanged} value={this.state.accForm.firstName} autoComplete="on" required />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={this.textChanged} value={this.state.accForm.lastName} autoComplete="on" required />
                    <input type="submit" name="submit" value="Create Account" />
                </form>

            </div>
        );
    }
}

export default SignupPage;