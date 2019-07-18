import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import decode from 'jwt-decode';

//pages
import SignupPage from "./pages/signup";
import MainPage from "./pages/index";
import LoginPage from "./pages/login";
import CreatePage from "./pages/create";
import MySurveysPage from "./pages/mysurveys"
import NotFound from "./pages/notfound";
import ViewSurveys from "./pages/viewsurvey";

//components
import MainNav from "./components/navigation"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {
        loggedIn: false,
        username: ''
      }
    };

    this.setLogInState = this.setLogInState.bind(this);
  }

  componentDidMount() {
    const user = this.verifyToken();
    if (user) {
      this.setLogInState(true, user);
    } else {
      console.log("No valid log in token");
    }
  }

  verifyToken() {
    const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
    if (token) {  //If we found a token
      const decoded = decode(token); //Decode our token
      if (decoded.exp > Date.now() / 1000) { //If the token expiry date is greater than current time/date the token is valid
        return decoded.username;
      } else {  //Otherwise it's not valid
        return false;
      }
    } else { //Return false as we didn't find a token
      return false;
    }
  }

  setLogInState = (loggedIn, username) => {
    console.log("Setting log in state");
    this.setState({
      status: {
        loggedIn: loggedIn,
        username: username
      }
    });
  }


  render() {
    return (
      <Router>
        <div className="App">
          <MainNav logState={this.state.status} />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/mysurveys" render={(props) => (
              this.state.status.loggedIn ? (<MySurveysPage username={this.state.status.username} {...props} />)
                : (<Redirect to='/login' />)
            )} />
            <Route path="/create" render={(props) => (
              this.state.status.loggedIn ? (<CreatePage username={this.state.status.username} {...props} />)
                : (<Redirect to='/login' />)
            )} />
            <Route path="/viewsurvey" render={(props) => <ViewSurveys username={this.state.status.username} {...props} />} /> {/* Route used to view specific surveys */}
            <Route path="/signup" render={(props) => <SignupPage  {...props} />} /> {/*Passing props to the 'SignupPage component, uses 'render' instead of 'component'*/}
            <Route path="/login" render={(props) => <LoginPage setLogInState={this.setLogInState} {...props} />} />
            <Route path="*" component={NotFound} /> {/*Catches any routes that don't match the above and sends them to the NotFound page*/}
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
