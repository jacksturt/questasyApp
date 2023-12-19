import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Define the path to the file you want to read
    const filePath = path.join(
      process.cwd(),
      "src/data/7f4a2ce0-6d10-46a1-8cb5-09bae643e9d7.json"
    );

    // Read the file
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the file contents (assuming it's JSON)
    const jsonData = JSON.parse(fileData);

    // Send the data as a JSON response
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error reading the file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
