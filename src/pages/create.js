import React, { Component } from 'react';
import '../styles/create.css';
import axios from 'axios';

let addedQuestionArr = [{
    id: 0,
    question: '',
    options: ''
}];

class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survObj: {
                title: '',
                id: 1,
                user: 'kingsolos',
                survey: [{
                    question: 'What is your favorite colour?',
                    type: 'radio',
                    options: ''
                }]
            }
        };

    }

    componentDidMount() {
        document.title = 'Create a survey';
    }

    addQuestion = (e) => {
        addedQuestionArr.push({ id: addedQuestionArr.length,    question: '',
        options: ''});
        console.log(addedQuestionArr);
    }

    render() {
        return (
            <div className='App-main'>
                <h1 className='createHeading'>Create a survey</h1>
                <div className='createSurveyMain'>
                    <form className='createSurveyForm'>
                        <div id='titleDiv'>
                            <label id='#titleLabel'>Survey title:</label>
                            <input type='text' id='titleInput' placeholder='Survey Title' />
                        </div>
                        <div id='descriptionDiv'>
                            <label id='#descriptionLabel'>Description:</label>
                            <input type='text' id='descriptionInput' placeholder='Description' />
                        </div>
                        <div className="questionDiv">
                            <a href='#' onClick={this.addQuestion}>
                                <i class="far fa-plus-square fa-2x" id="plusIcon"></i>
                            </a>
                            <Question />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

let QuestionLayout = () => {
    return (
        <div className="insideQuestionDiv">
            <div id='quesDiv'>
                <label id='#quesLabel'>Question: </label>
                <input type='text' id='quesInput' placeholder='Question' />
            </div>
            <div id='optionsDiv'>
                <label id='#optionsLabel'>Options:</label>
                <input type='text' id='optionsInput' placeholder='Comma seperated e.g. (Option 1, Option 2)' />
            </div>
        </div>
    );
}

let Question = () => {
    return (
        addedQuestionArr.map(item => QuestionLayout())
    );
}

export default CreatePage;