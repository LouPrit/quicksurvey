import React, { Component } from 'react';
import '../styles/stats.css';
import axios from 'axios';

let URL = (process.env.NODE_ENV === 'production') ? 'https://quicksurvey-react.herokuapp.com' : 'http://localhost:3001';

let statsArr = [];

class StatisticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.MainBit = this.MainBit.bind(this);
    }


    componentDidMount() {
        document.title = "Stats Page";
        /**
         * Set the stats Array back to empty when component mounts, 
         * this is because if a user navigates away from this component to another component this array stays populated
         * causing the information on the page to appear x2, x3, x4 increasing with each subsequent visit
         * This is likely because we aren't storing this array inside the component state
         */
        statsArr = []; 

        const params = new URLSearchParams(window.location.search); //'window.location.search' creates a string containing a '?' followed by the parameters of the URL.
        const id = params.get("id"); //ID of the survey


        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.get(`${URL}/update/${id}`, { headers: { "Authorization": `Bearer ${token}` } }) //Make a get request for survey stats
            .then(reply => this.setState(
                reply.data[0]
            ))
            .catch(error => console.log(error))
    }

    GenerateStats(props) {
        return (
            Object.keys(statsArr[props.i].options).map((key, index) =>
                <div key={index}><p>{key}: {statsArr[props.i].options[key]}</p></div>
            )
        );
    }

    MainBit() {
        Object.keys(this.state).filter(key => !key.includes("id") && !key.includes("__v")).map(x =>
            statsArr.push({
                question: x,
                options: this.state[x]
            })
        );
        return (
            statsArr.map((x, index) => <li key={index}>
                <h1>{x.question}</h1>
                <this.GenerateStats i={index} />
            </li>)
        );
    }

    test() {
        alert(`Check browser console logs - Press F12 and select 'console'.`);
        console.log(JSON.stringify(statsArr));
    }

    render() {
        return (
            <div className='App-main'>
                <h1 className='statsTitle'>Survey Statistics</h1>
                <ul className='statsStyle'>
                    <this.MainBit />
                    <input type="button" value="Generate JSON" className='buttonStyle btn btn-dark' onClick={this.test.bind(this)} />
                </ul>
            </div>

        );
    }
}

export default StatisticsPage;

