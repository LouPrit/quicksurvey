import React, { Component } from 'react';
import '../styles/viewsurvey.css';
import axios from 'axios';


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

        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.get(`http://localhost:3001/survey/${this.props.username}/${id}`, { headers: { "Authorization": `Bearer ${token}` } }) //Make a get request sending our authorization header
            .then(data => this.setState(
                data.data[0]
            ))
            .catch(error => console.log(error));
    }

    test() {
        console.log(JSON.stringify(this.state));
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
                        <form className="formSection">
                            <this.CreateOptions index={index} type={item.quesType} />
                        </form>
                    </div>)
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
        return (this.state.questions[props.index].options.split(', ').map((item, index) => <div className="surveyDiv" key={props.index + index}><label className="surveyLabel" >{item}</label><input className="surveyInput" type={props.type} name={props.index} /></div>));
    }

    render() {
        return (
            <div className="App-main">
                <h1 id="title">{this.state.title}</h1>
                <p id="descript">{this.state.description}</p>
                <this.section />
            </div>

        );
    }
}

export default ViewSurveys;

