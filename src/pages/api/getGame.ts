import {
  PlayerData,
  convertGameStats,
  convertTeamStats,
} from "@/helpers/dataConversion";
import { SRGameData } from "@/types";
import axios from "axios";
import fs from "fs";
import path from "path";

const SPORTSRADAR_API_BASE =
  "https://api.sportradar.us/nfl/official/trial/v7/en";
const SPORTSRADAR_API_KEY = "atc9c9phveefwywzvukjs8u9";
export const GAME_ID = "322508eb-5e6c-42d1-b91e-c08535bcf245";

export const getGame = async (id: string): Promise<SRGameData> => {
  try {
    // Define the path to the file you want to read
    const filePath = path.join(process.cwd(), `src/data/${id}.json`);

    // Read the file
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the file contents (assuming it's JSON)
    const jsonData = JSON.parse(fileData);
    // Send the data as a JSON response
    return jsonData;
  } catch (error) {
    console.log("data from web");

    const url = `${SPORTSRADAR_API_BASE}/games/${id}/statistics.json?api_key=${SPORTSRADAR_API_KEY}`;

    const result = await axios.get(url);
    const data = result.data;
    if (data.status === "closed" && process.env.IS_VERCEL !== "true") {
      const filePath = path.join(process.cwd(), `src/data/${id}.json`);
      // Convert the data to a JSON string
      const jsonData = JSON.stringify(data, null, 2);

      // Write the data to the file
      fs.writeFileSync(filePath, jsonData, "utf-8");
    }
    return data;
  }
};

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerData | unknown>
) {
  const data = await getGame(GAME_ID);
  try {
    const converted = convertGameStats(data);
    res.status(200).json(converted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
