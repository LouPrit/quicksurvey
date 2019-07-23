import React, { Component } from 'react';
import '../styles/home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AllSurveysPage extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            retrievedData: false,
            surveys: []
        };

        this.SurveyList = this.SurveyList.bind(this);
    }


    componentDidMount() {
        document.title = "All Surveys";

        axios.get(`http://localhost:3001/survey/`) //Make a get request for all surveys
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
                this.state.surveys.map((survey, index) => <li key={index} className="buttonList"><Link className="allSurveysPageButt btn btn-dark" to={`/viewsurvey/?id=${survey.id}&user=${survey.username}`}>{survey.title} by {survey.username}</Link></li>)
            );
        }
    }


    render() {
        return (
            <div className="App-main">
                <h1 id="loginHeading">All Surveys</h1>
                <ul className="survey-list-main">
                    <this.SurveyList />
                </ul>
            </div>

        );
    }
}

export default AllSurveysPage;

