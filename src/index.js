'use strict';
var AWS = require('aws-sdk');
var allowOrigin = require('./configuration/config');


exports.handler = (event, context, callback) => {

    AWS.config.update({region: 'us-east-1'});
    var dynamodb = new AWS.DynamoDB();




    const database = [
        {
            id: "Augie-Chung",
            name: "Augie Chung",
            categoryId: "friends"
        },
        {
            id: "Barry-Fichtner",
            name: "Barry Fichtner",
            categoryId: "colleagues"
        },
        {
            id: "Daniel-Brennan",
            name: "Daniel Brennan",
            categoryId: "family"
        },  
    ];
    


    switch(event.httpMethod){

        case "GET":

            var params = {  
                TableName: 'edbrennanguru.friends',
                ReturnConsumedCapacity: 'TOTAL'
            };

            dynamodb.scan(params).promise()
            .then((items) => {
                //https://stackoverflow.com/questions/31911898/configure-cors-response-headers-on-aws-lambda
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin" : allowOrigin,
                        "Access-Control-Allow-Credentials" : "true",
                        "Vary": "Origin"
                    },
                    body: JSON.stringify(items.Items)
                  };

                callback(null, response);

            })
            .catch((error) => {

                const response = {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin" : allowOrigin,
                        "Access-Control-Allow-Credentials" : "true",
                        "Vary": "Origin"
                    },
                    body: JSON.stringify(error)
                }

                callback(null, response);
            })                
        
                break;

        case "POST":            
            callback(null, {body: "This is a CREATE operation"}); 
            break;

        case "PUT": 
            callback(null, {body: "This is an UPDATE operation on product ID " + id});
            break;

        case "DELETE": 
            callback(null, {body:"This is a DELETE operation on product ID " + id});
            break;

        default:

            const errorResponse = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : allowOrigin,
                    "Access-Control-Allow-Credentials" : "true",
                    "Vary": "Origin"
                },
                body: JSON.stringify({
                    message: 'Bad request Dude',
                }),
            };

            // Send HTTP 501: Not Implemented
            console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
            callback(null, errorResponse);

    };

}