import React from "react";
import '../styles/index.css';

const survObj = [{
    question: "Test question 1?",
    type: 'text',
    options: [{
        option: "Option 1"
    },
    {
        option: "Option 2"
    },
    {
        option: "Option 3"
    },
    {
        option: "Option 4"
    }]
},
{
    question: "Test question 2?",
    type: 'radio',
    options: [{
        option: "Option 5"
    },
    {
        option: "Option 6"
    }]
},
{
    question: "Test question 3?",
    type: 'checkbox',
    options: [{
        option: "Option 7"
    },
    {
        option: "Option 8"
    },
    {
        option: "Option 8"
    }]
},
{
    question: "Test question 2?",
    type: 'radio',
    options: [{
        option: "Option 5"
    },
    {
        option: "Option 6"
    }]
}];

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
        survObj.map((item, index) =>
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
    return(survObj[props.index].options.map(item => <div className="surveyDiv"><label className="surveyLabel">{item.option}</label><input className="surveyInput" key={props.index} type={props.type} name={props.index} /></div>));
}

export default MainPage;