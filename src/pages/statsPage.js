import React, { Component } from 'react';
import '../styles/stats.css';
import axios from 'axios';


class StatisticsPage extends Component { 
    constructor(props) {
        super(props);

        this.state = {
        };

    }


    componentDidMount() {
        document.title = "Stats Page";

        const params = new URLSearchParams(window.location.search); //'window.location.search' creates a string containing a '?' followed by the parameters of the URL.
        const id = params.get("id"); //ID of the survey


        const token = localStorage.getItem("qs_auth_token"); //Find our token and assign to const 'token'
        axios.get(`http://localhost:3001/update/${id}`, { headers: { "Authorization": `Bearer ${token}` } }) //Make a get request for survey stats
            .then(reply => this.setState(
                    reply.data[0]
            ))
            .catch(error => console.log(error))
    }

    test() {
        alert(JSON.stringify(this.state));
    }

    render() {
        return (
            <div className="App-main">
                <h1>Survey Statistics</h1>
                <input type="button" onClick={this.test.bind(this)} value="Test" />
            </div>

        );
    }
}

export default StatisticsPage;

