/* eslint-disable class-methods-use-this */
import db from '../db/db';


class TrainingsController {
    getAllTrainings(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'trainings retrieved successfully',
            trainings: db
        })
    }

    getTraining(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map((trainings) => {
            if (trainings.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'training retrieved successfully',
                    trainings,
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'trainings does not exist',
        });
    }

    createTraining(req, res) {
        if(!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if(!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required'
            });
        }
        const trainings = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description
        }
        db.push(trainings);
        return res.status(201).send({
            success: 'true',
            message: 'trainings added successfully',
            trainings
        });
    }

    updateTraining(req, res) {
        const id = parseInt(req.params.id, 10);
        let trainingFound;
        let itemIndex;
        db.map((training, index) => {
            if (training.id === id) {
                trainingFound = training;
                itemIndex = index;
            }
        });

        if (!trainingFound) {
            return res.status(404).send({
                success: 'false',
                message: 'training not found',
            });
        }

        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required',
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required',
            });
        }

        const updatedTraining = {
            id: trainingFound.id,
            title: req.body.title || trainingFound.title,
            description: req.body.description || trainingFound.description,
        };

        db.splice(itemIndex, 1, updatedTraining);

        return res.status(201).send({
            success: 'true',
            message: 'training updated successfully',
            updatedTraining,
        });
    }

    deleteTraining(req, res) {
        const id = parseInt(req.params.id, 10);

        db.map((trainings, index) => {
            if (trainings.id === id) {
                db.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'Training deleted successfuly',
                });
            }
        });


        return res.status(404).send({
            success: 'false',
            message: 'training do not found',
        });
    }

    userLogin (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    }
}

const trainingsController = new TrainingsController();
export default trainingsController;