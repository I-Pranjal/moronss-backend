const KEY = process.env.RAPIDAPI_KEY;
const axios = require('axios');

async function getDetails(profileURL){
    
const options = {
  method: 'GET',
  url: 'https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url',
  params: {
    url:profileURL,
  },
  headers: {
    'x-rapidapi-key': KEY,
    'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	return response.data;

} catch (error) {
	console.error(error);
}


}

async function Gemini_response_linkedIn(data){
    
}

module.exports = {
  getDetails
};