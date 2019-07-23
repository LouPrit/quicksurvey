import React, { Component } from 'react';
import '../styles/create.css';
import axios from 'axios';

class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            username: props.username,
            id: Date.now(), //Provides us with a unique ID as Date.now returns the milliseconds since January 1, 1970 00:00:00
            questions: [
                {
                    id: 0,
                    quesType: 'radio',
                    question: '',
                    options: ''
                }
            ]
        };

        this.Question = this.Question.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.saveSurvey = this.saveSurvey.bind(this);
    }

    componentDidMount() {
        document.title = 'Create a survey';
    }

    /**
     * Called by the 'onChange' handler for adding a title, description, question or options
     * @param {*} e - Event passed from handler
     */
    textChanged(e) {
        const id = Number(e.target.id); //Grab the ID of our target and convert to number
        const name = e.target.name; //Get the 'name' attribute of our target (either 'question' or 'options')

        //If we are typing inside title or description field do this 
        if (name === 'title' || name === 'description') {
            this.setState(
                {
                    [name]: e.target.value
                }
            );
            //If we are typing inside question or options field do this 
        } else if (name === "question" || name === "options") {
            let questionsCopy = JSON.parse(JSON.stringify(this.state.questions)); //Clone a complete copy of the 'questions' array from State
            //Add the text the user typed into the questionsCopy object, using the id and name
            questionsCopy[questionsCopy.findIndex(i => i.id === id)][name] = e.target.value;
            //Set the state to our newly altered questions object.
            this.setState(
                {
                    questions: questionsCopy
                }
            );
            //If none of the others match, the user can only be changing the question type (radio/checkbox).. handle that here.
        } else {
            let questionsCopy = JSON.parse(JSON.stringify(this.state.questions));
            questionsCopy[questionsCopy.findIndex(i => i.id === id)]["quesType"] = e.target.value;
            this.setState(
                {
                    questions: questionsCopy
                }
            );
        }
    }

    /**
     * Adds a new object into the questions array
     */
    addQuestion(e) {
        e.preventDefault();
        this.setState(
            {
                questions: [
                    ...this.state.questions,
                    {
                        id: Date.now(),
                        quesType: 'radio',
                        question: '',
                        options: ''
                    }
                ]
            }
        );
    }

    /**
     * Layout for each of the question / options boxes
     * @param {*} id - this allows us to tie together the inputs / buttons etc to the correct list item.
     */
    questionLayout(id) {
        return (
            <li className="insideQuestionDiv" key={id} id={id}>
                <a href=" " onClick={this.removeQuestion} className="shrinkAnchorMinus">
                    <i className="far fa-minus-square fa-2x" id={id}></i>
                </a>
                <div className="questionType" onChange={this.textChanged} >
                    <p className="boldLabel">Style:</p>
                    <label><input type="radio" name={id} id={id} value="radio" defaultChecked="true" /> Radio (Only one option can be chosen)</label>
                    <label><input type="radio" name={id} id={id} value="checkbox" /> Checkbox (Multiple opttions can be chosen)</label>
                </div>
                <div id='quesDiv'>
                    <label id='#quesLabel' className="boldLabel">Question: </label>
                    <input type='text' id={id} name="question" className='quesInput' placeholder='Question' onChange={this.textChanged} required={true} />
                </div>
                <div id='optionsDiv'>
                    <label id='#optionsLabel' className="boldLabel">Options:</label>
                    <input type='text' id={id} name="options" className='optionsInput' placeholder='Comma seperated e.g. (Option 1, Option 2)' onChange={this.textChanged} required={true} />
                </div>
            </li>
        );
    }

    /**
     * Iterates through the questions array and creates a visual layout for each one along with a unique id
     */
    Question() {
        return (
            this.state.questions.map((item) => this.questionLayout(item.id))
        );
    }

    /**
     * Triggered when a user clicks a '-' button to remove a question from the survey
     */
    removeQuestion(e) {
        e.preventDefault(); //Using anchor tags to prevents page from refreshing / URL altering
        const id = Number(e.target.id); //Get the ID of the button we pressed (the buttons ID matches the li ID)
        if (id !== 0) {
            const questionArray = JSON.parse(JSON.stringify(this.state.questions)); //Clone a complete copy of the 'questions' array from State
            questionArray.splice(questionArray.findIndex(i => i.id === id), 1);
            this.setState(
                {
                    questions: [...questionArray]
                }
            );
        } else {
            alert("Unable to remove");
        }
    }

    /**
 * Creates the object that is sent to the database for tracking the choices users have made on different surveys
 */
    createStatsObject(survey) {

        if (survey.id) {
            //This is how our object starts
            let statsObject = {
                'id': survey.id
            }

            //Adds a new key to our 'statsObject' for each of the questions in the survey and assigns and empty object to it. e.g.  'Favourite Colour?: {}'
            survey.questions.map(item => statsObject[item.question] = {
            });

            //Iterates through each of the questions in our survey and splits the options for each question into an array before iterating through each of the options.
            //Each of the options are then assigned to the appropriate question inside our 'statsObject' and assigned the starting value of 0
            survey.questions.map(item =>
                item.options.split(', ').map(option =>
                    statsObject[item.question][option] = 0
                )
            );

            return (statsObject);
        } else {
            return null;
        }

    }

    //Posts the survey object to the database
    saveSurvey(e) {
        e.preventDefault();
        const statsObject = this.createStatsObject(this.state);

        if (statsObject !== null) {
            const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
            axios.post('http://localhost:3001/survey/create/', [this.state, statsObject], { headers: { "Authorization": `Bearer ${token}` } }) //Make a post request sending our data and authorization header
                .then(reply => {
                    alert("Survey saved!");
                    document.getElementById("myForm").reset();
                    this.setState(
                        {
                            title: '',
                            description: '',
                            username: this.props.username,
                            id: Date.now(), //Provides us with a unique ID as Date.now returns the milliseconds since January 1, 1970 00:00:00
                            questions: [
                                {
                                    id: 0,
                                    quesType: 'radio',
                                    question: '',
                                    options: ''
                                }
                            ]
                        }
                    );
                }
                ).catch((error) => {
                    alert("Failed, see console for more info");
                    console.log(error)
                });
        } else {
            console.log("FAILED, NO ID");
        }
    }

    //The render method for the page
    render() {
        return (
            <div className='App-main'>
                <h1 className='createHeading'>Create a survey</h1>
                <div className='createSurveyMain'>
                    <form id="myForm" className='createSurveyForm' onSubmit={this.saveSurvey}>
                        <div id='titleDiv'>
                            <label id='#titleLabel' className="boldLabel">Survey title:</label>
                            <input type='text' name="title" id='titleInput' placeholder='Survey Title' onChange={this.textChanged} required={true} />
                        </div>
                        <div id='descriptionDiv'>
                            <label id='#descriptionLabel' className="boldLabel">Description:</label>
                            <input type='text' name="description" id='descriptionInput' placeholder='Description' onChange={this.textChanged} required={true} />
                        </div>
                        <div className="questionDiv">
                            <a href=' ' onClick={this.addQuestion} className="shrinkAnchorPlus">
                                <i className="far fa-plus-square fa-2x" id="plusIcon"></i>
                            </a>
                            <ul className="questionList">
                                <this.Question />
                            </ul>
                        </div>
                        <button type="submit" className="loginInput btn btn-dark">Save Survey</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default CreatePage;