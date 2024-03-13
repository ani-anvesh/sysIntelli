const AWS = require("aws-sdk");

// Initialize AWS SQS
const sqs = new AWS.SQS({ region: "us-east-2" });
const queueUrl =
  "https://sqs.us-east-2.amazonaws.com/381491977884/sysIntelli_temporary_lock"; // Replace with your SQS queue URL

// Function to send a message to the SQS queue
exports.sendMessage = async (messageBody) => {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: queueUrl,
  };

  try {
    await sqs.sendMessage(params).promise();
    console.log("Message sent to the queue.");
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
    WaitTimeSeconds: 20, // Long-polling
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      data.Messages.forEach((message) => {
        console.log("Received message:", JSON.parse(message.Body));
        // Optionally, process the message further
      });
    } else {
      console.log("No messages available.");
    }
  } catch (error) {
    console.error("Error receiving messages:", error);
    throw error;
  }
};

// Example usage
// receiveMessages();
