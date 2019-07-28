import express from 'express';
import db from '../db/db';
import trainingsController from '../controllers/trainings';


const router = express.Router();

// get all trainings
router.get('/api/v1/trainings', trainingsController.getAllTrainings);
router.get('/api/v1/trainings/:id', trainingsController.getTraining);
router.post('/api/v1/trainings', trainingsController.createTraining);
router.put('/api/v1/trainings/:id', trainingsController.updateTraining);
router.delete('/api/v1/trainings/:id', trainingsController.deleteTraining);

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});


export default router;
