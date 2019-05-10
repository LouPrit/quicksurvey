import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <div>
            <p className="App-title">QuickSurvey</p>
          </div>
          <ul className="App-nav">
            <a href="#">Surveys</a>
            <a href="#">My Surveys</a>
            <a href="#">Create Survey</a>
          </ul>
          <ul className="App-nav-login">
            <a href="#">Login</a>
            <a href="#">Signup</a>
          </ul>
        </nav>
        <div className="App-main">

        </div>
      </div>
    );
  }

}

export default App;
