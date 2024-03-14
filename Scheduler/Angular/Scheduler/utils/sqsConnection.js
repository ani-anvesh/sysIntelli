const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAVRUVRT2OLSKHDY3W",
  secretAccessKey: "wM8ZUS4wUGbk38Ii+e5tM5wXcx+7hXJowqF7ptDb",
  region: "us-east-2", // Replace with your AWS region
});

// Initialize AWS SQS
const sqs = new AWS.SQS();
const queueUrl = "https://sqs.us-east-2.amazonaws.com/381491977884/sqs_anvesh"; // Replace with your SQS queue URL

// Function to send a message to the SQS queue
exports.sendMessage = async (messageBody) => {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: queueUrl,
  };
  try {
    await sqs.sendMessage(params).promise();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Example usage
// sendMessage({ message: "Hello, SQS!" });

// Function to receive messages from the SQS queue
exports.receiveMessages = async () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 0,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      return data.Messages;
    } else {
      return [{ error: "No messages available." }];
    }
  } catch (error) {
    console.error("Error receiving messages:", error);
    throw error;
  }
};

// Example usage
// receiveMessages();
