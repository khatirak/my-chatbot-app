import { main } from '../route';

export default async function handler(req, res) {
    const { message } = req.body;

    try {
        const response = await main(message);
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}


// import AWS from 'aws-sdk'; // Modern import syntax for Node.js with ES6 modules

// // Initialize the Bedrock client with the appropriate region
// const client = new AWS.Bedrock({ region: 'eu-west-2' }); // Changed to London region as per your requirements

// // Main API handler function
// export default async function handler(req, res) {
// const { message } = req.body; // Extract the message from the request body

// if (!message) {
//     return res.status(400).json({ error: 'Message prompt is required' }); // Check if message is provided
// }

// try {
//     // Invoke the AWS Bedrock model with the provided message
//     const response = await invokeModel(message);
//     res.status(200).json({ output: response }); // Return the model's output in the response
// } catch (error) {
//     console.error('Error:', error.message || error); // Improved error logging
//     res.status(500).json({ error: 'Failed to process the request' }); // Standardized error response
// }
// }

// // Function to invoke the Bedrock model with the provided prompt
// async function invokeModel(prompt) {
// try {
//     // Call the Bedrock model using the AWS SDK
//     const result = await client.invokeModel({
//         modelId: 'amazon.stable-diffusion', // Replace with your actual Bedrock model ID
//         input: { prompt } // Pass the prompt as input to the model
//     }).promise();

//     // Assuming the result contains an output field with the model's response
//     return result.output;
// } catch (error) {
//     console.error('Error invoking Bedrock model:', error.message || error); // Improved error logging
//     throw new Error('Failed to invoke model'); // Throw an error to be caught by the handler
// }
// }


