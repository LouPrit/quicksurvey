import React, { Component } from 'react';
import '../styles/viewsurvey.css';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import $ from 'jquery';

let URL = (process.env.NODE_ENV === 'production') ? 'https://quicksurvey-react.herokuapp.com' : 'http://localhost:3001';

class ViewSurveys extends Component { //Username is passed to this component from 'App.js'
    constructor(props) {
        super(props);

        this.state = {
        };
        this.section = this.section.bind(this);
        this.CreateOptions = this.CreateOptions.bind(this);
    }

    componentDidMount() {
        document.title = "View Survey";

        const params = new URLSearchParams(window.location.search); //'window.location.search' creates a string containing a '?' followed by the parameters of the URL.
        const id = params.get("id"); //ID of the survey
        const user = params.get("user")

        axios.get(`${URL}/survey/${user}/${id}`) //Make a get request sending our authorization header
            .then(data => {
                this.setState(
                    data.data[0]
                );
            })
            .catch(error => console.log(error));
    }

    /**
 * Returns the full section for each survey segment (Question + options)
 */
    section() {
        if (this.state.title) {
            return (
                this.state.questions.map((item, index) =>
                    <div key={index} className="surveySection">
                        <h1 className="sectionTitle">{item.question}</h1>
                        <div className="formSection">
                            <this.CreateOptions sectionindex={index} type={item.quesType} question={item.question} />
                        </div>
                    </div>
                )
            );
        } else {
            return (<h1>Loading...</h1>);
        }
    }

    /**
 * Returns a div containing input / label for each of the options provided
 * @param {*} props Props passed from 'Section' function to this function
 */
    CreateOptions(props) {
        return (this.state.questions[props.sectionindex].options.split(', ').map((item, index) =>
            <div className="surveyDiv" key={props.sectionindex + index}>
                <label className="surveyLabel" >{item}</label>
                <input className="surveyInput" type={props.type} name={props.question} value={item} />
            </div>
        ));
    }

    /**
     * Created a cookie based on values passed and saves it
     * @param  name    - name of cookie (survey ID)
     * @param  value   - Value of cookie, this is set to 'true'
     * @param  expires - Amount of days before cookie expires
     */
    setCookie(name, value, expires) {
        var date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
        var expireDate = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expireDate + ";path=/";
    }

    /**
     * Uses JQuery to convert the user input on the form into a JSON object that can be used.
     * @param {*} e - Event passed from button.
     */
    formToJSON(e) {
        e.preventDefault();
        const id = this.state.id;

        if (document.cookie.indexOf(`${id}=`) >= 0) { //If a cookie with the key that matches our survey ID is found, the survey has already been completed
            alert("FAILED: You have already completed this survey");
        } else {
            let formData = $("#surveyForm").serializeArray(); //Use JQuery to encode a set of form elements as an array of names and values.

            const finalFormData = {
                'id': id,
                'answers': formData
            };

            axios.patch(`${URL}/update/`, (finalFormData))
                .then(x => {
                    this.setCookie(id, true, 90);
                    document.getElementById('surveyForm').reset();
                    alert("SUCCESS: Survey submitted successfully");
                })
                .catch(error => console.log(error));
        }
    }

    //Once the CAPTCHA has been completed we enable the submit button
    onChange() {
        document.getElementById('surveyButton').disabled = false;
    }

    render() {
        return (
            <div className="App-main">
                <h1 id="title">{this.state.title}</h1>
                <p id="descript">{this.state.description}</p>
                <form onSubmit={this.formToJSON.bind(this)} id="surveyForm">
                    <this.section />
                </form>
                <div id="captchaSubmit">
                    <ReCAPTCHA className="CAPTCHA" sitekey="6LdC1LAUAAAAABECAj8NxM1Np9cO9ol_B4RJ8vAT" onChange={this.onChange} disabled />
                    <button type="submit" id="surveyButton" className="btn btn-dark" form="surveyForm" disabled >Submit</button>
                </div>
            </div>

        );
    }
}

export default ViewSurveys;

