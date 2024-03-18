import amqp from 'amqplib/callback_api.js';
// import { v4 as uuidv4 } from 'crypto/callback_api.js';

const queuePaymentRequest = 'paymentRequest';
const queuePaymentResponse = 'paymentResponse';
const username = "developer2" //process.env.username;
const password = "giYZB5m%jM3KKakD"//process.env.password;

export async function handler (event) {
    return new Promise((resolve, reject) => {
    var encodedPassword = encodeURIComponent(password);
    amqp.connect("amqps://"+username+":"+encodedPassword+"@b-258577ee-ad63-431b-9f94-005160961adf.mq.eu-north-1.amazonaws.com:5671", function(error0, connection){
        if (error0) {
            reject(error0)
            return;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                reject(error1)
                return;
            }
            channel.assertQueue(queuePaymentRequest, { durable: true });
            channel.assertQueue(queuePaymentResponse, { durable: true });
            channel.consume(queuePaymentRequest, function (inputMessage) {
                const paymentRequestId = inputMessage.content.toString();
                const paymentConfirmationId = "CONFIRMED";
                // const paymentConfirmationId = uuidv();
                console.log(`\n\n [x] Received payment request ${paymentRequestId}`);
                const outputMessage = JSON.stringify({
                    paymentRequestId: paymentRequestId,
                    paymentConfirmationId: paymentConfirmationId
                });
                console.log(outputMessage);
                channel.sendToQueue(queuePaymentResponse, Buffer.from(outputMessage));
                console.log(` [x] Sent payment response ${outputMessage}`);
            }, {
                noAck: true
            });
        });
    });
    });
};