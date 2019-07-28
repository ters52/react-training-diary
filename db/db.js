
const trainings =  [
    {
        id: 1,
        title: "lunch",
        description: "Go for lunc by 2pm"
    }
];


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

var sql = "SELECT name FROM trainings.users";

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected 1!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        var out = '';
        for (var i in result[0]) {

            out += i + ": " + result[0][i] + "\n";
        }
        console.log("Result: " + out);
    });
});


export default trainings;