import React, { Component } from 'react';
import '../styles/mysurveys.css';
import axios from 'axios';


class MySurveysPage extends Component { //Username is passed to this component from 'App.js'
    constructor(props) {
        super(props);

        this.state = {
            retrievedData: false,
            surveys: []
        };

        this.SurveyList = this.SurveyList.bind(this);
        this.test = this.test.bind(this);
    }


    componentDidMount() {
        document.title = "My Surveys";

        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.get(`http://localhost:3001/survey/${this.props.username}`, { headers: { "Authorization": `Bearer ${token}` } }) //Make a get request sending our authorization header
            .then(reply => this.setState(
                {
                    retrievedData: true,
                    surveys: reply.data
                }
            ))
            .catch(error => console.log(error))
    }

    /**
     * Displays a list of survey titles that the user created, displays a loading screen or no surveys found screen if not.
     */
    SurveyList = () => {
        if (!this.state.retrievedData) {
            return (
                <h1>Retrieving surveys...</h1>
            );
        } else if (this.state.surveys.length === 0) {
            return (
                <h1>No surveys found!</h1>
            );
        } else {
            return (
                this.state.surveys.map((survey, index) => <li key={index} className="buttonList"><button className="survListButt" id={index} onClick={this.test}>{survey.title}</button></li>)
            );
        }
    }

    test = (e) => {
        console.log(this.state.surveys[e.target.getAttribute('id')]);
    }


    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">My Surveys</h1>
                <ul className="survey-list-main">
                    <this.SurveyList />
                </ul>
            </div>

        );
    }
}

export default MySurveysPage;

