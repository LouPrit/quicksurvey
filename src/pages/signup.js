import React from "react";
import '../styles/signup.css';

function SignupPage() {
    return (
        <div className="App-main">
            <h1 id="heading">Create your free account</h1>
            <h2>Already have account? <a href="login">Log In</a></h2>

            <form className="signupForm">
                <p>~ Create an account ~</p>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="text" name="firstname" placeholder="First Name" />
                <input type="email" name="lastname" placeholder="Last Name" />
                <input type="submit" name="submit" value="Create Account" />
            </form>

        </div>
    );
}

export default SignupPage;