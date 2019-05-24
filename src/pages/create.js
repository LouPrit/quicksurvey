import React, { Component } from 'react';
import '../styles/create.css';
import axios from 'axios';


class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survObj: {
                title: "Survey 1",
                id: 1,
                user: "kingsolos",
                survey: [{
                    question: "What is your favorite colour?",
                    type: 'radio',
                    options: [{
                        option: "Red"
                    },
                    {
                        option: "Yellow"
                    },
                    {
                        option: "Pink"
                    },
                    {
                        option: "Green"
                    }]
                }]
            }
        };

    }

    componentDidMount() {
        document.title = "Create a survey";
    }

    render() {
        return (
            <div className="App-main">
                <h1 className="createHeading">Create a survey</h1>
                <div className="createSurveyMain">
                    <form className="createSurveyForm">
                        <div id="titleDiv">
                        <label id="#titleLabel">Survey title</label>
                        <input type="text" id="titleInput" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreatePage;