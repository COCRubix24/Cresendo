import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import mime from "mime-types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

function fileToGenerativePart(path) {
  const mimeType = mime.lookup(path) || "application/octet-stream";
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export const extraction = async(req, res) => {
  try {
    // const shelf1 = req.files.shelf1[0];
    // const shelf2 = req.files.shelf2[0];
    // console.log(shelf1, shelf2);
    // console.log(req.files)
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = 'Give all the wrong structures present or harmful product at top which may cause bad impression to user, and see which product should be where for better retail shelf optimization. Also suggest the shelf changes if you have any .Keep it to the point consise and dont divert it. Strictly give in a single paragraph without any newline or bullet points etc, strictly dont include newline only one paragraph without any special symbols';

    const imageParts = [fileToGenerativePart("D:/zzzzzzz/Cresendo/backend/shelf1.JPG"), fileToGenerativePart("D:/zzzzzzz/Cresendo/backend/shelf2.JPG")];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    res.json({ data : text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};