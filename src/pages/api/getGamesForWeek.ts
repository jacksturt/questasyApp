import {
  PlayerData,
  convertGameStats,
  convertTeamStats,
} from "@/helpers/dataConversion";
import { SRGameData } from "@/types";
import axios from "axios";
import fs from "fs";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";
import { WEEK_15_GAME_IDS, WEEK_16_GAME_IDS } from "@/constants";
import { cacheFunctionWithTimeout } from "@/helpers/caching";
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
    // console.log("data from file");
    // Send the data as a JSON response
    return jsonData;
  } catch (error) {
    const cachedFunction = cacheFunctionWithTimeout(getGameAPI, 60000); // Cache for 1 minute

    const data = await cachedFunction(id);
    // console.log(data);
    return data;
  }
};

const getGameAPI = async (id: string): Promise<SRGameData> => {
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerData | unknown>
) {
  try {
    let gamesData = {};
    const getGamesMap = WEEK_16_GAME_IDS.map(async (game) => {
      {
        const data = await getGame(game);
        const converted = convertGameStats(data);
        gamesData = { ...gamesData, ...converted };
      }
    });
    await Promise.all(getGamesMap);
    res.status(200).json(gamesData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
