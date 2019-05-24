import React from "react";
import '../styles/index.css';

const survObj = {
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
    },
    {
        question: "What is your favorite food?",
        type: 'radio',
        options: [{
            option: "hello there"
        }]
    },
    {
        question: "Test question 3?",
        type: 'checkbox',
        options: [{
            option: "Option 1"
        },
        {
            option: "Option 2"
        },
        {
            option: "Option 3"
        }]
    }]
}

/**
 * This is the main display
 */
function MainPage() {
    return (
        <div className="App-main">
            <form className="surveyForm">
                <Section />
                <input type="submit" className="surveyButton btn btn-dark" value="Submit" />
            </form>
        </div>
    );
}


/**
 * Returns the full section for each survey segment (Question + options)
 */
function Section() {
    return (
        survObj.survey.map((item, index) =>
            <div key={index} className="surveySection">
                <h1 className="sectionTitle">{item.question}</h1>
                <form className="formSection">
                <CreateOptions index={index} type={item.type}/>
                </form>
            </div>)
    );
}

/**
 * Returns a div containing input / label for each of the options provided
 * @param {*} props Props passed from 'Section' function to this function
 */
function CreateOptions(props) {
    return(survObj.survey[props.index].options.map(item => <div className="surveyDiv"><label className="surveyLabel">{item.option}</label><input className="surveyInput" key={props.index} type={props.type} name={props.index} /></div>));
}

export default MainPage;