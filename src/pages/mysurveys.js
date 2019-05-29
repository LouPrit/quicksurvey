import React, { Component } from 'react';
import '../styles/create.css';


class MySurveysPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidMount() {
        document.title = "My Surveys";
    }

    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">My Surveys</h1>
            </div>
        );
    }
}

export default MySurveysPage;