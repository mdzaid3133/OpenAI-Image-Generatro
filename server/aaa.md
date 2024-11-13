import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const STABILITY_API_KEY = process.env.STABILITY_API_KEY

// Check for API Key
if (!STABILITY_API_KEY) {
  throw new Error('Missing STABILITY_API_KEY in environment variables');
}



export const generateImage = async (req, res, next) => {
  const { prompt } = req.body;

  // Validate prompt
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid prompt. Please provide a valid string prompt.',
    });
  }

  try {
    const response = await axios.post(
      `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
      {
        prompt: prompt,        // Prompt text for image generation
        width: 512,            // Set image width
        height: 512,           // Set image height
        samples: 1,            // Number of images to generate
        cfg_scale: 7.5,        // Prompt adherence (higher values stick closer to prompt)
        steps: 30              // Number of steps for image generation
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
      }
    );

    const imageData = response.data.artifacts[0].base64;
    console.log('myiamgeData', imageData);
    res.json({
      success: true,
      message: 'Image generated successfully',
      photo: imageData,
    });

  } catch (error) {
      console.log('Error generating image :',error.message);
      res.status(500).json({
        success:false,
        error:error.message
      });
  }
};
