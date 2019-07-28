import React, { Component } from "react";
import { Form, Input, FormButton } from "../Form/Form";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import './Training.scss';



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
                // let approach = exercise.approaches[x];

                approaches.push(
                    <div key={"approach" + x} className="TrainingEditForm__approach">
                        <Grid container alignItems={'center'}>
                            <Grid item>
                                <Input title={"Approach " + (+x+1)}
                                       type="text"
                                       className="TrainingEditForm__approachField"
                                       value={exercise.approaches[x]}
                                       onChange={this.props.onFieldChange}
                                       name={"exercises." + i + ".approaches." + x}/>
                            </Grid>
                            <Grid item className="_pl-1">
                                <FormButton className="TrainingEditForm__removeApproach"
                                            onClick={this.props.onRemoveApproachClick}
                                            data-approach-num={x}
                                            data-exercise-num={i}
                                            variant="contained"
                                            size="small">
                                    <RemoveIcon/>
                                </FormButton>
                            </Grid>
                            {console.log(exercise.approaches.length)}
                            {console.log(x+1)}
                            { exercise.approaches.length == +x+1 &&
                                <FormButton type="submit"
                                            className="TrainingEditForm__addApproach"
                                            onClick={this.props.onAddApproachClick}
                                            data-exercise-num={i}
                                            variant="contained"
                                            size="small">
                                    <AddIcon/>
                                </FormButton>}
                        </Grid>
                    </div>

                );
            }

            content.push(
                <div key={i} className="TrainingEditForm__exercise">
                    <Grid container alignItems={'center'}>
                        <Grid item sm={4} xs={12} className="TrainingEditForm__exerciseName">
                            <Input title="Exercise name:"
                                   className="TrainingEditForm__exerciseName"
                                   value={exercise.name}
                                   onChange={this.props.onFieldChange}
                                   name={"exercises." + i + ".name"} />

                            <IconButton aria-label="Delete Exersise"
                                        type="submit"
                                        color="secondary"
                                        className="TrainingEditForm__addExercise"
                                        onClick={this.props.onRemoveTrainingClick}
                                        variant="contained"
                                        size="large"
                                        mb={20}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            {approaches}
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Divider />
                </div>
            );
        }

        return(
            <div className="TrainingEditForm">
                <Form className="TrainingEditForm_form" onSubmit={this.props.handleSaveTraining} action="">
                    <Typography variant="h5">
                        Edit Training:
                    </Typography>
                    <Grid container>
                        <Grid item sm={4} xs={12}>
                            <Input title="Date:"
                                   className="TrainingEditForm__weightBefore"
                                   value={this.props.data.date}
                                   onChange={this.props.onFieldChange}
                                   name="date"/>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Input title="Weight before:"
                                   className="TrainingEditForm__weightBefore"
                                   value={weight.before_training}
                                   onChange={this.props.onFieldChange}
                                   name="weight.before_training"/>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Input title="Weight after:"
                                   className="TrainingEditForm__weightAfter"
                                   value={weight.after_training}
                                   onChange={this.props.onFieldChange}
                                   name="weight.after_training"/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Exercises:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {content}
                        </Grid>

                        <Grid item xs={12}>
                            <FormButton type="submit"
                                        className="TrainingEditForm__addExercise"
                                        onClick={this.props.onAddExerciseClick}
                                        variant="contained"
                                        size="large" mb={20}>
                                <AddIcon/>
                                Exercise
                            </FormButton>
                        </Grid>
                    </Grid>

                    <Grid container>

                        <Grid item xs={12}>
                            <FormButton type="submit"
                                        className="TrainingEditForm__cancelButton"
                                        onClick={this.props.onCancelEditClick}
                                        variant="contained"
                                        size="large">
                                Cancel
                            </FormButton>

                            <FormButton type="submit"
                                        className="TrainingEditForm__saveButton"
                                        variant="contained"
                                        color="primary"
                                        size="large">
                                Save Training
                            </FormButton>
                        </Grid>

                    </Grid>

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
                <Typography variant="h4">
                    {this.props.data.date}
                </Typography>
                <Typography variant="body1" className="TrainingContent__weightBefore">
                    {weight.before_training}
                </Typography>
                <Typography component={'div'} variant="body1">
                    {content}
                </Typography>

                <Typography variant="body1" className="TrainingContent__weightAfter">
                    {weight.after_training}
                </Typography>

                <FormButton className="TrainingContent__editButton" onClick={this.props.handleEditButton}>
                    Edit Training
                </FormButton>
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
        this.handleRemoveExercise = this.handleRemoveExercise.bind(this);

    }

    handleRemoveApproach(e) {
        e.preventDefault();
        const approachNum = e.currentTarget.getAttribute("data-approach-num");
        const exerciseNum = e.currentTarget.getAttribute("data-exercise-num");

        if(approachNum && exerciseNum) {
            let updatedData  = JSON.parse(JSON.stringify(this.state.data));
            updatedData["exercises"][+exerciseNum]["approaches"].splice(+approachNum, 1);
            this.setState({data: {...updatedData}, isEdit: true});
        }

    }

    handleAddApproach(e) {
        e.preventDefault();
        const exerciseNum = e.currentTarget.getAttribute("data-exercise-num");

        if(exerciseNum) {
            let updatedData  = JSON.parse(JSON.stringify(this.state.data));
            updatedData["exercises"][+exerciseNum]["approaches"].push("");
            this.setState({data: {...updatedData}, isEdit: true});
        }
    }

    handleRemoveExercise(e) {
        e.preventDefault();
        const exerciseNum = e.currentTarget.getAttribute("data-exercise-num");

        if(exerciseNum) {
            let updatedData  = JSON.parse(JSON.stringify(this.state.data));
            updatedData["exercises"].splice(+exerciseNum, 1);
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
        e.currentTarget.name.split('.').map(function(currentValue, index, array) {
            if(array && index === array.length-1) {
                targetObject[currentValue] = e.currentTarget.value;
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

                    <Grid container alignItems="center" className="_my-3">
                        <Grid item xs={12}>
                            <Card className="Training">
                                <Grid container>
                                    <Grid item xs={10}>
                                        <CardContent>
                                            {this.state.data.openEditForm &&
                                            <TrainingEditForm
                                                data={this.state.data}
                                                handleSaveTraining={this.handleSaveTraining}
                                                onCancelEditClick={this.handleCancelEdit}
                                                onFieldChange={this.handleTrainingFieldOnChange}
                                                onRemoveApproachClick={this.handleRemoveApproach}
                                                onAddApproachClick={this.handleAddApproach}
                                                onAddExerciseClick={this.handleAddExercise}
                                                onAddTrainingClick={this.handleAddTraining}
                                                onRemoveTrainingClick={this.handleRemoveExercise}/>
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
                                        </CardContent>
                                    </Grid>

                                    <Grid item xs={2} className="Training__DeleteGrid">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={this.props.handleRemoveTraining}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item sm={2} xs={12} className="_pl-1">
                            {this.props.children}
                        </Grid>
                    </Grid>

        );
    }
}

export default Training;