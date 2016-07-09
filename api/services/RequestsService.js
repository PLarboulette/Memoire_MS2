/**
 * Created by pierre on 09/07/16.
 */

'use strict';

const request = require('request');
const uuid = require('uuid');


module.exports = class RequestsService {
    
    constructor (connection, uuidInstance) {
        this.connection = connection;
        this.uuidInstance = uuidInstance;
    }
    
    createRequest (req, res, callback) {


        const requestIn = req.body;

        const request = {
            uuid : requestIn.uuid,
            step : parseInt(requestIn.step)+ 1,
            type : this.connection.escape('IN'),
            instance : this.uuidInstance,
            timestamp : new Date().getTime()
        };

        // Insert the new request which will be send
        this.connection.query('INSERT INTO Requests SET ?', request, function(err, result) {
            if (err) throw err;
        });

        // Some task ....


        const requestOut = {
            uuid : requestIn.uuid,
            step : parseInt(request.step)+ 1,
            type : this.connection.escape('OUT'),
            instance : this.uuidInstance,
            timestamp : new Date().getTime()
        };

        // Insert the new request which will be send
        this.connection.query('INSERT INTO Requests SET ?', requestOut, function(err, result) {
            if (err) throw err;
        });

        if (parseInt(requestOut.step) == 10) {
            res.send('Finished');
        } else {
            res.send(requestOut);
        }


       /* request.post({url:'http://localhost:3001', formData: data}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('Fail : ', err);
            }
            console.log('Success : ', body);
        });
        callback(null, "ok");*/

        // res.send("TDone!")
    }

    // Timestamp là
    

} ; 

