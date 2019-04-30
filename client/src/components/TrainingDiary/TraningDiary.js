import React, { Component } from "react";
import Training from "./Training";

import './TrainingDiary.scss';


let initialData = [
        {
            "openEditForm" : false,
            "date" : "01.04.2019",
            "exercises": [
                {
                    "name": "Running",
                    "approaches": [
                        "12*20",
                        "10*40"
                    ]
                }
            ],
            "weight": {
                "before_training": "",
                "after_training": ""
            }
        },
        {
            "openEditForm" : false,
            "date" : "04.04.2019",
            "exercises": [
                {
                    "name": "Running",
                    "approaches": [
                        "13*20",
                        "11*40"
                    ]
                }
            ],
            "weight": {
                "before_training": "",
                "after_training": ""
            }
        }
    ];


const apiRequest = (endpoint, method, data = []) => {
    const fetchUri = window.ApiBase + endpoint + "?jwt=" + sessionStorage.getItem(window.tokenKey);
    fetch(fetchUri, {
        method: method,
        body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                return result;

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                return error;
            }
        )
}
class TrainingsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trainingsData: []
        }

        this.updateTrainingData = this.updateTrainingData.bind(this);
        this.handleAddTraining = this.handleAddTraining.bind(this);
        this.handleRemoveTraining = this.handleRemoveTraining.bind(this);
    }

    componentDidMount() {
        const fetchUri = window.ApiBase + "trainings?jwt=" + sessionStorage.getItem(window.tokenKey);
        fetch(fetchUri, {
            method: "GET"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if(result && result.length > 0) {
                        result = (result == "Data not found") ? [] : result;

                        this.setState({
                            trainingsData: [...result]
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
    }

    updateTrainingData (index, updatedData) {
        let currentData = [...this.state.trainingsData]
        currentData[index] = updatedData;
        currentData[index]['openEditForm'] = false;
        const endpoint = "trainings/" + currentData[index]["id"];
        apiRequest(endpoint, "PUT", "training=" + encodeURIComponent(JSON.stringify(currentData[index])));

        this.setState({trainingsData : [...currentData]});
    }

    handleAddTraining(e) {
        e.preventDefault();

        let updatedData = JSON.parse(JSON.stringify(this.state.trainingsData));
        const index = updatedData.push({
            "openEditForm" : true,
            "date": "",
            "exercises": [
                {
                    "name": "",
                    "approaches": [
                        ""
                    ]
                }
            ],
            "weight": {
                "before_training": "",
                "after_training": ""
            }
        });

        const endpoint = "trainings";
        apiRequest(endpoint, "POST",  "training=" + encodeURIComponent(JSON.stringify(updatedData[index-1])));

        this.setState({trainingsData: [...updatedData]});
    }

    handleRemoveTraining(e) {
        e.preventDefault();

        const trainingId = e.target.getAttribute("data-training-num");

        if(trainingId) {
            let updatedData = JSON.parse(JSON.stringify(this.state.trainingsData));

            const endpoint = "trainings/" + updatedData[trainingId]["id"];
            console.log(updatedData[trainingId]["id"]);
            apiRequest(endpoint, "DELETE");
            updatedData.splice(+trainingId, 1);
            this.setState({trainingsData: [...updatedData]});
        }
    }

    render() {

        let trainings = [];
        const trainingsData = [...this.state.trainingsData];
        const updateTrainingData = this.updateTrainingData;
        const handleRemoveTraining = this.handleRemoveTraining;


        trainingsData.map(function(trainingData, index) {
            trainings.push(
                    <Training key={index + trainingData.date + trainingData.id}
                              isEdit={trainingData.openEditForm}
                              data={trainingData}
                              id={index}
                              updateTrainingData={updateTrainingData}>
                        <br/>
                        <button key={"removeTrainingButton" + index + trainingData.date}
                                className="TrainingEditForm__removeTrainingButton"
                                onClick={handleRemoveTraining}
                                data-training-num={"" + index}>
                            Remove training
                        </button>
                        <br/><br/>
                    </Training>

            );

        });

        return(
            <div className="TrainingsList">
                {trainings.length > 0 && trainings}
                {trainings.length < 1 &&
                    <p>You haven't any trainings yet.</p>
                }

                <br/><br/>
                <button className="TrainingEditForm__addTrainingButton"
                        onClick={this.handleAddTraining}>
                    Add training
                </button>
                <br/>
            </div>
        );
    }
}

class TrainingDiary extends Component {
    render() {

        return (
            <div className="TrainingDiary">
                <TrainingsList/>
            </div>
        );
    }
}

export default TrainingDiary;