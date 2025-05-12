const dotenv = require('dotenv');
const { ElevenLabsClient } = require('elevenlabs');

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  throw new Error('Missing ELEVENLABS_API_KEY in environment variables');
}

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

const createAudioStreamFromText = async (text) => {
  const audioStream = await client.textToSpeech.convertAsStream('JBFqnCBsd6RMkjVDRZzb', {
    model_id: 'eleven_multilingual_v2',
    text,
    output_format: 'mp3_44100_128',
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

  return Buffer.concat(chunks);
};

module.exports = { createAudioStreamFromText };
