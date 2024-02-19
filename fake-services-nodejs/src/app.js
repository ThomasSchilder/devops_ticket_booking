"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid').v4;
////////////////////////////////////
// FAKE SEAT RESERVATION SERVICE
////////////////////////////////////
var zeebe_node_1 = require("zeebe-node");
require("dotenv").config();
var zeebeClient = new zeebe_node_1.ZBClient();
var worker = zeebeClient.createWorker('reserve-seats', reserveSeatsHandler);
function reserveSeatsHandler(job, _, worker) {
    console.log("\n\n Reserve seats now...");
    console.log(job);
    // Do the real reservation
    // TODO: Fake some results! Fake an error (when exactly?)
    if ("seats" !== job.variables.simulateBookingFailure) {
        console.log("Successul :-)");
        return job.complete({
            reservationId: "1234",
        });
    }
    else {
        console.log("ERROR: Seats could not be reserved!");
        return job.error("ErrorSeatsNotAvailable");
    }
}
////////////////////////////////////
// FAKE PAYMENT SERVICE
////////////////////////////////////
var amqp = require('amqplib/callback_api');
var queuePaymentRequest = 'paymentRequest';
var queuePaymentResponse = 'paymentResponse';
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(queuePaymentRequest, { durable: true });
        channel.assertQueue(queuePaymentResponse, { durable: true });
        channel.consume(queuePaymentRequest, function (inputMessage) {
            var paymentRequestId = inputMessage.content.toString();
            var paymentConfirmationId = uuidv4();
            console.log("\n\n [x] Received payment request %s", paymentRequestId);
            var outputMessage = '{"paymentRequestId": "' + paymentRequestId + '", "paymentConfirmationId": "' + paymentConfirmationId + '"}';
            channel.sendToQueue(queuePaymentResponse, Buffer.from(outputMessage));
            console.log(" [x] Sent payment response %s", outputMessage);
        }, {
            noAck: true
        });
    });
});
////////////////////////////////////
// FAKE TICKET GENERATION SERVICE
////////////////////////////////////
var express = require("express");
var app = express();
app.listen(3000, function () {
    console.log("HTTP Server running on port 3000");
});
app.get("/ticket", function (req, res, next) {
    var ticketId = uuidv4();
    console.log("\n\n [x] Create Ticket %s", ticketId);
    res.json({ "ticketId": ticketId });
});