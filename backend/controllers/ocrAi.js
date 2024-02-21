import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import mime from "mime-types";
import axios from "axios"; // Import axios for fetching files

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: data.toString("base64"),
      mimeType,
    },
  };
}

export const extraction = async (req, res) => {
  try {
    // Get the IPFS file links from the request body
    const { shelf1, shelf2 } = req.body;

    // Fetch the IPFS files
    const [shelf1File, shelf2File] = await Promise.all([
      axios.get(shelf1, { responseType: "arraybuffer" }),
      axios.get(shelf2, { responseType: "arraybuffer" }),
    ]);

    // Convert fetched files to generative parts
    const imageParts = [
      fileToGenerativePart(shelf1File.data, shelf1File.headers["content-type"]),
      fileToGenerativePart(shelf2File.data, shelf2File.headers["content-type"]),
    ];

    // Initialize the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Define the prompt
    const prompt =
      "Give all the wrong structures present or harmful product at top which may cause bad impression to user, and see which product should be where for better retail shelf optimization. Also suggest the shelf changes if you have any. Keep it to the point concise and don't divert it. Strictly give in a single paragraph without any special symbols.";

    // Generate content using the model and image parts
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    res.json({ data: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
