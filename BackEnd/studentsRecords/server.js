
var express = require('express');
var logger = require('./logger');
var app = express();

var students = require('./routes/students');
var residencies = require('./routes/residencies');
var genders= require('./routes/genders');
var advStandings = require('./routes/advStandings');
var awards = require('./routes/awards');
var courseCodes = require('./routes/courseCodes');
var planCodes = require('./routes/planCodes');
var termCodes = require('./routes/termCodes');
var grades = require('./routes/grades');
var programRecords = require('./routes/programRecords');
var schoolTerms = require('./routes/schoolTerms');
var programs = require('./routes/programs')
var users = require('./routes/users');
var passwords = require('./routes/passwords');
var roleCodes = require('./routes/roleCodes');
var userRoles = require('./routes/usersRoles');
var rolePermissions = require('./routes/rolePermissions');
var logins = require('./routes/logins');
var roots = require('./routes/roots');

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);
//app.use(express.static('public'));

app.use('/students', students);
app.use('/residencies', residencies);
app.use('/genders', genders);
app.use('/advStandings', advStandings);
app.use('/awards', awards);
app.use('/courseCodes',courseCodes);
app.use('/planCodes',planCodes);
app.use('/termCodes',termCodes);
app.use('/grades',grades);
app.use('/programRecords', programRecords);
app.use('/schoolTerms', schoolTerms );
app.use('/programs', programs);
app.use('/users', users);
app.use('/passwords', passwords);
app.use('/roleCodes', roleCodes);
app.use('/userRoles', userRoles);
app.use('/rolePermissions', rolePermissions);
app.use('/logins', logins);
app.use('/roots', roots);


app.listen(3700, function () {
    console.log('Listening on port 3700');
});
