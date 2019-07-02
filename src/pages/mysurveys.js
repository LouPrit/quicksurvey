import React, { Component } from 'react';
import '../styles/create.css';
import axios from 'axios';


class MySurveysPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveys: []
        };


        this.test = this.test.bind(this);
    }

    componentDidMount() {
        document.title = "My Surveys";
        axios.get(`http://localhost:3001/survey/${this.props.username}`)
            .then(reply => this.setState(
                {
                    surveys: reply.data
                }
            ))
            .catch(error => console.log(error));
    }

    test = () => {
        console.log(JSON.stringify(this.state.surveys));
    }

    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">My Surveys</h1>
                <input type="button" onClick={this.test} />
            </div>

        );
    }
}

export default MySurveysPage;

