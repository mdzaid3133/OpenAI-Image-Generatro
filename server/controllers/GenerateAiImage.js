import fetch from 'node-fetch'; 
import dotenv from 'dotenv';

dotenv.config();

// Function to generate image from text
export const generateImageFromText = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt text is required.",
    });
  }

  const api_token = process.env.API_TOKEN;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Image generation failed");
    }

    const buffer = await response.buffer();
     console.log('buffer: ' + buffer.toString())
    // Respond with the image as a base64 URL
    const imageBase64 = `data:image/png;base64,${buffer.toString("base64")}`;
    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      photo: imageBase64,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      message: "Error generating image",
      error: error.message,
    });
  }
};
