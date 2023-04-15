// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Connection API gateway for neptune query
const axios = require('axios');

async function getQuery() {
  try {
    // URL with API Gateway invoke URL
    const apiGatewayURL = 'https://efwx4k79v2.execute-api.us-east-1.amazonaws.com/queryNeptune';

    // Send a request to the API Gateway
    const response = await axios.get(apiGatewayURL);


    /** TODO Currently response is getting the vertices edit as needed for actual query */
    
    // Use the response data directly
    const vertices = response.data;

    // Print the vertices
    console.log(vertices);

    // Return the vertices
    return vertices;
    
  } catch (error) {
    console.error('Error fetching vertices:', error);
  }
}

// Call the function to fetch vertices
getQuery();




/// I had to comment out below to see the above code work. 
/// After it is fixed so it can output the result to front end should work. -Jodi
export default function handler(req, res) {
  res.status(200).json([
    {condition: "graves' disease", treatments: [{treatment: "aleve", dosage: "2 x 220mg"}, {treatment: "methimazole", dosage: '10 mg'}]},
    {condition: "food allergies", treatments: [{treatment: "antihistamine"}]},
    {condition: "fibromyalgia", treatments: [{treatment: "imodium", dosage: "3 tablets"}, {treatment: "mobic", dosage: "1 pill"}]}
  ])
}
