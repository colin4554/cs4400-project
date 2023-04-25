// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Connection API gateway for neptune query
const axios = require('axios');

async function getQuery() {
  try {
    // URL with API Gateway invoke URL
    const apiGatewayURL = 'https://efwx4k79v2.execute-api.us-east-1.amazonaws.com/queryNeptune';

    // Send a request to the API Gateway, 
    // TODO: pass in dynamic values of symptoms and gender from user input
    const response = await axios.post(apiGatewayURL);
    // console.log(response);
    // Process names in the format of [{name: headache, treatments: [iburopen, etc]}]
    const data = response.data;
    console.log(data);
    return data;
  }  catch (error) {
    console.error('Error fetching vertices:', error);
  } 
}





/// I had to comment out below to see the above code work. 
/// After it is fixed so it can output the result to front end should work. -Jodi
export default async function handler(req, res) {
  try {
    // URL with API Gateway invoke URL
    const apiGatewayURL = 'https://efwx4k79v2.execute-api.us-east-1.amazonaws.com/queryNeptune';

    // Send a request to the API Gateway, 
    // TODO: pass in dynamic values of symptoms and gender from user input
    const body = JSON.parse(req.body);
    const symptoms = body['symptoms'];
    const gender = body['gender'];
    const response = await axios.post(apiGatewayURL, {
      symptoms: symptoms,
      gender: gender,
    });
    // console.log(req.params);
    // Process names in the format of [{name: headache, treatments: [{name1, dosage1}, {name2, dosage2}]
    const data = response.data;
    console.log(data);
    res.end(JSON.stringify(data));
    return data;
  }  catch (error) {
    console.error('Error fetching queries:', error);
  } 
}
