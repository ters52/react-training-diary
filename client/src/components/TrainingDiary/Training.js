import React, { Component } from "react";
import { Form, Input, Button } from "../Form/Form";


class TrainingEditForm extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const exercises = this.props.data.exercises;
        const weight = this.props.data.weight;

        let content = [];

        for(let i in exercises) {

            const exercise = exercises[i];
            let approaches = [];

            for(let x in exercise.approaches) {
                let approach = exercise.approaches[x];

                approaches.push(
                    <div key={"approach" + x} className="TrainingEditForm__approach">
                        <Input title={"Approach " + (1+x)}
                               type="text"
                               className="TrainingEditForm__approachField"
                               value={exercise.approaches[x]}
                               onChange={this.props.onFieldChange}
                               name={"exercises." + i + ".approaches." + x}/>
                        <button className="TrainingEditForm__removeApproach"
                                onClick={this.props.onRemoveApproachClick}
                                data-approach-num={x}
                                data-exercise-num={i} >
                            -
                        </button>

                    </div>

                );
            }

            content.push(
                <div key={i} className="TrainingEditForm__exercise">
                    <Input className="TrainingEditForm__exerciseName"
                           value={exercise.name}
                           onChange={this.props.onFieldChange}
                           name={"exercises." + i + ".name"} />
                    {approaches}
                    <Button type="submit"
                            title="+ Add approach"
                            className="TrainingEditForm__addApproach"
                            onClick={this.props.onAddApproachClick}
                            data-exercise-num={i}/>
                </div>
            );
        }

        return(
            <div className="TrainingEditForm">
                <Form className="TrainingEditForm_form" onSubmit={this.props.handleSaveTraining} action="">
                    <Input title="Date:"
                           className="TrainingEditForm__weightBefore"
                           value={this.props.data.date}
                           onChange={this.props.onFieldChange}
                           name="date"/>
                    <br/>
                    <Input title="Weight before:"
                           className="TrainingEditForm__weightBefore"
                           value={weight.before_training}
                           onChange={this.props.onFieldChange}
                           name="weight.before_training"/>
                    {content}
                    <br/>
                    <Button type="submit"
                            title="+ Exercise"
                            className="TrainingEditForm__addApproach"
                            onClick={this.props.onAddExerciseClick}/>
                    <br/>
                    <Input title="Weight after:"
                           className="TrainingEditForm__weightAfter"
                           value={weight.after_training}
                           onChange={this.props.onFieldChange}
                           name="weight.after_training"/>
                    <br/>
                    <Button type="submit"
                            title="Cancel"
                            className="TrainingEditForm__cancelButton"
                            onClick={this.props.onCancelEditClick}/>

                    <Button type="submit"
                            title="Save Training"
                            className="TrainingEditForm__saveButton"/>

                    <br/>
                    <br/>

                </Form>

            </div>

        );
    }
}

class TrainingContent extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const exercises = this.props.data.exercises;
        const weight = this.props.data.weight;

        let content = [];

        for(let i in exercises) {

            const exercise = exercises[i];

            content.push(
                <div key={i} className="TrainingContent__exercise">
                    <p className="TrainingContent__exerciseName">{exercise.name}</p>
                    <p className="TrainingContent__exerciseContent"> {exercise.approaches.join(", ")}</p>
                </div>
            );
        }

        return(
            <div className="TrainingContent">
                <h3>{this.props.data.date}</h3>
                <p className="TrainingContent__weightBefore">{weight.before_training}</p>
                {content}
                <p className="TrainingContent__weightAfter">{weight.after_training}</p>
                <button className="TrainingContent__editButton" onClick={this.props.handleEditButton}>
                    Edit Training
                </button>
            </div>

        );
    }
}

class Training extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isEdit : this.props.data.openEditForm,
            data : JSON.parse(JSON.stringify(this.props.data))
        }

        this.handleSaveTraining = this.handleSaveTraining.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleTrainingFieldOnChange = this.handleTrainingFieldOnChange.bind(this);
        this.handleRemoveApproach = this.handleRemoveApproach.bind(this);
        this.handleAddApproach = this.handleAddApproach.bind(this);
        this.handleAddExercise = this.handleAddExercise.bind(this);


    }

    handleRemoveApproach(e) {
        e.preventDefault();
        const approachNum = e.target.getAttribute("data-approach-num");
        const exerciseNum = e.target.getAttribute("data-exercise-num");

        if(approachNum && exerciseNum) {
            let updatedData  = JSON.parse(JSON.stringify(this.state.data));
            updatedData["exercises"][+exerciseNum]["approaches"].splice(+approachNum, 1);
            this.setState({data: {...updatedData}, isEdit: true});
        }

    }

    handleAddApproach(e) {
        e.preventDefault();
        const exerciseNum = e.target.getAttribute("data-exercise-num");

        if(exerciseNum) {
            let updatedData  = JSON.parse(JSON.stringify(this.state.data));
            updatedData["exercises"][+exerciseNum]["approaches"].push("");
            this.setState({data: {...updatedData}, isEdit: true});
        }
    }

    handleAddExercise(e) {
        e.preventDefault();
        let updatedData = JSON.parse(JSON.stringify(this.state.data));
        updatedData["exercises"].push({
            name: "",
            approaches: [""]
        });
        updatedData["openEditForm"] = true;
        this.setState({data: {...updatedData}, isEdit: true});
    }


    handleTrainingFieldOnChange(e) {
        let updatedData = JSON.parse(JSON.stringify(this.state.data)),
            targetObject = updatedData;
        e.target.name.split('.').map(function(currentValue, index, array) {
            if(array && index === array.length-1) {
                targetObject[currentValue] = e.target.value;
            } else {
                targetObject = targetObject[currentValue];
            }
        });
        updatedData["openEditForm"] = true;
        this.setState({data : updatedData, isEdit: true});
    }


    handleCancelEdit(e) {
        e.preventDefault();
        let updatedData = JSON.parse(JSON.stringify(this.props.data));
        updatedData.openEditForm = false;
        this.setState({data : updatedData, isEdit : false});
    }

    handleSaveTraining(e) {
        e.preventDefault();
        let updatedData = JSON.parse(JSON.stringify(this.state.data));
        updatedData.openEditForm = false;
        this.props.updateTrainingData(this.props.id, JSON.parse(JSON.stringify(this.state.data)));
        this.setState({data : updatedData});
    }

    render() {
        return(
            <div className="Training">

                {this.state.data.openEditForm &&
                <TrainingEditForm
                    data={this.state.data}
                    handleSaveTraining={this.handleSaveTraining}
                    onCancelEditClick={this.handleCancelEdit}
                    onFieldChange={this.handleTrainingFieldOnChange}
                    onRemoveApproachClick={this.handleRemoveApproach}
                    onAddApproachClick={this.handleAddApproach}
                    onAddExerciseClick={this.handleAddExercise}
                    onAddTrainingClick={this.handleAddTraining}/>
                }

                {!this.state.data.openEditForm &&
                <TrainingContent
                    data={this.state.data}
                    handleEditButton={(e) => {
                        e.preventDefault();
                        let updatedData = JSON.parse(JSON.stringify(this.props.data));
                        updatedData.openEditForm = true;
                        this.setState({data: updatedData});
                    }}/>
                }

                {this.props.children}
            </div>
        );
    }
}

export default Training;