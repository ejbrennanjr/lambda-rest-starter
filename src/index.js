'use strict';

exports.handler = (event, context, callback) => {
//export const handler = (event, context, callback) => {
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
            //https://stackoverflow.com/questions/31911898/configure-cors-response-headers-on-aws-lambda
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "https://api.edbrennan.guru",
                    "Access-Control-Allow-Credentials" : "true",
                    "Vary": "Origin"
                },
                body: JSON.stringify(database),
              };


            callback(null, response);
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
              "x-custom-header" : "my custom header value"
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