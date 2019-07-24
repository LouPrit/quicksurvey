import React, { Component } from 'react';
import '../styles/mysurveys.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

let URL = (process.env.NODE_ENV === 'production') ? 'http://quicksurvey-react.herokuapp.com' : 'http://localhost:3001';

class MySurveysPage extends Component { //Username is passed to this component from 'App.js'
    constructor(props) {
        super(props);

        this.state = {
            retrievedData: false,
            surveys: []
        };

        this.SurveyList = this.SurveyList.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
    }


    componentDidMount() {
        document.title = "My Surveys";

        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.get(`${URL}/survey/${this.props.username}`, { headers: { "Authorization": `Bearer ${token}` } }) //Make a get request sending our authorization header
            .then(reply => this.setState(
                {
                    retrievedData: true,
                    surveys: reply.data
                }
            ))
            .catch(error => console.log(error))
    }

    deleteSurvey(e) {
        const surveyID = e.target.attributes.getNamedItem('btnid').value;

        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.delete(`${URL}/survey/delete/${surveyID}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(reply => {
            const newState = this.state.surveys.filter(survey => survey.id !== Number(surveyID));
            this.setState({
                surveys: newState
            }, () => {
                console.log("Survey deleted");
            });
        }
            )
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
                this.state.surveys.map((survey, index) => <li key={index} className="buttonList"><Link className="survListButt btn btn-dark" to={`/preview/?id=${survey.id}&user=${this.props.username}`}>Preview - {survey.title}</Link><Link className="statsButton btn btn-info" to={`/stats/?id=${survey.id}`}>Stats</Link><button className="deleteButtons btn btn-danger" onClick={this.deleteSurvey} btnid={survey.id} >Delete</button></li>)
            );
        }
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

