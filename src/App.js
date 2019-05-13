import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

//pages
import SignupPage from "./pages/signup";
import MainPage from "./pages/index"
import LoginPage from "./pages/login"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={MainPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    );
  }

}

export default App;
