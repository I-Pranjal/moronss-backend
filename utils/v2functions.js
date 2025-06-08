const KEY = process.env.RAPIDAPI_KEY;
const axios = require('axios');
const pdfParse = require('pdf-parse');


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

async function extractJDContent(textInput, file) {
  if (file) {
    const pdfBuffer = file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    return pdfData.text.trim();
  }
  return textInput?.trim();
}


module.exports = {
  getDetails, extractJDContent
};