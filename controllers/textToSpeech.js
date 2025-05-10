const dotenv = require('dotenv');
const { ElevenLabsClient } = require('elevenlabs');

dotenv.config();

const ELEVENLABS_API_KEY = "sk_00ff0999d81aaf2ee302b389f78652b88ed1bb04ee78dca8";

if (!ELEVENLABS_API_KEY) {
    throw new Error('Missing ELEVENLABS_API_KEY in environment variables');
}

const client = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});

const createAudioStreamFromText = async (text) => {
    try {
        console.log('Creating audio stream from text:', text);
        console.log('Using ElevenLabs API key:', ELEVENLABS_API_KEY);
        const audioStream = await client.textToSpeech.convertAsStream('JBFqnCBsd6RMkjVDRZzb', {
            model_id: 'eleven_multilingual_v2',
            text,
            output_format: 'mp3_44100_128',
            // Optional voice settings that allow you to customize the output
            voice_settings: {
                stability: 0,
                similarity_boost: 1.0,
                use_speaker_boost: true,
                speed: 1.0,
            },
        });

        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }

        const content = Buffer.concat(chunks);
        return content; // Return the audio content buffer
    } catch (error) {
        console.error('Error creating audio stream:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

module.exports = { createAudioStreamFromText };
