import React, { Component } from 'react';
import '../styles/signup.css';


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
        this.handleSubmit = this.handleSubmit.bind(this);
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
        alert(JSON.stringify(this.state.accForm));
    }


    render() {
        return (
            <div className="App-main">
                <h1 id="heading">Create your free account</h1>
                <h2>Already have account? <a href="login">Log In</a></h2>

                <form className="signupForm" onSubmit={this.handleSubmit}>
                    <p>~ Create an account ~</p>
                    <input type="text" name="username" placeholder="Username" onChange={this.textChanged} value={this.state.accForm.username} required />
                    <input type="password" name="password" placeholder="Password" onChange={this.textChanged} value={this.state.accForm.password} required />
                    <input type="email" name="email" placeholder="Email" onChange={this.textChanged} value={this.state.accForm.email} required />
                    <input type="text" name="firstName" placeholder="First Name" onChange={this.textChanged} value={this.state.accForm.firstName} required/>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={this.textChanged} value={this.state.accForm.lastName} required/>
                    <input type="submit" name="submit" value="Create Account" />
                </form>

            </div>
        );
    }
}  

export default SignupPage;