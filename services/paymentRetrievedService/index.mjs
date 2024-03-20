import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";


/**
 * This function creates a connection with a RabbitMQ broker using the credentials stored in the AWS Secret Manager.
 */
async function createConnection() {
        // Query RabbitMQ credentials from AWS Secret Manager
        const client = new SecretsManagerClient({
            region: "eu-north-1",
        });
        const secret_name = "lambda-mq-access";
        let response;
        try {
            response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secret_name,
                    VersionStage: "AWSCURRENT"
                })
            );
        } catch (error) {
            console.log(error)
            throw error;
        }
        const secret = JSON.parse(response.SecretString);

        // Parse secret object
        let username = secret.username;
        let password = encodeURI(secret.password);
        let host = secret.host;
        let port = secret.port;

        // Create connection
        const conn = await amqp.connect(`amqps://${username}:${password}@${host}:${port}`);
        return conn;
}

export const handler = async (event) => {
    // Retrieve messages from event variable.
    let messages = event["rmqMessagesByQueue"]["paymentRequest::/"];
    console.log(`Found ${messages.length} messages`);


    // Start connection to send message to respond queue.
    let conn = await createConnection();

    // Connect to queue.
    const responseQueue = 'paymentResponse';
    const channel = await conn.createChannel();
    console.log(`Connected to queue '${responseQueue}'`);

    for (let message of messages) {
        // Parse message and check if id is given.
        let data = message.data;
        if (data) {
            // Transform buffer to (utf-8) string.
            const id = Buffer.from(data, 'base64').toString('utf8');

            // Create a message response.
            const response = JSON.stringify({
                paymentRequestId: id,
                paymentConfirmationId: uuidv4()
            });

            // Send response.
            channel.sendToQueue(responseQueue, Buffer.from(response));
            console.log(`Sent response to '${responseQueue}'`);
        }

    }

    // Close channel.
    console.log("Closing channel");
    await channel.close();

    // Close connection.
    console.log("Closing connection");
    await conn.close();
};