import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

//pages
import SignupPage from "./pages/signup";
import MainPage from "./pages/index"
import LoginPage from "./pages/login"

//components
import MainNav from "./components/navigation"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <Router>
        <div className="App">
          <MainNav />
          <Route path="/" exact component={MainPage} />
          <Route path="/signup" render={(props) => <SignupPage text="hello there" {...props} />} /> {/*Passing props to the 'SignupPage component, uses 'render' instead of 'component'*/}
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }

}

export default App;
