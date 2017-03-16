var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        

        var rule = new models.rules(request.body.rule);
        
        rule.save(function (error) {
            if (error) response.send(error);
            response.json({rule: rule});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Student = request.query;
        
        if (!Student) {
            
            models.rules.find(function (error, rules) {
                if (error) response.send(error);
                response.json({rule: rules});
            });
        } else {
            
            models.rules.find({"students": Student.student}, function (error, students) {
                if (error) response.send(error);
                response.json({rule: students});
            });
        }
    });

router.route('/:rules_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.rules.findById(request.params.rule_id, function (error, rule) {
            if (error) response.send(error);
            response.json({rule: rule});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.rules.findById(request.params.rule_id, function (error, rule) {
            if (error) {
                response.send({error: error});
            }
            else {
                rule.description = request.body.rule.description;
                rule.logExpressions = request.body.rule.logExpressions;
                rule.assessmentCode = request.body.assessmentCode;
                rule.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rule: rule});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.rules.findByIdAndRemove(request.params.rule_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rule: deleted});
                }
            }
        );
    });

module.exports = router;