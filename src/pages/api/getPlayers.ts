import { PlayerData } from "@/helpers/dataConversion";
import { SRGameData } from "@/types";
import axios from "axios";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { SleeperPlayersMap } from "@/types/sleeper";
import { SleeperToSRMap } from "@/types/native";

export const getPlayers = async (): Promise<SleeperPlayersMap> => {
  try {
    // Define the path to the file you want to read
    const filePath = path.join(process.cwd(), `src/data/players.json`);

    // Read the file
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the file contents (assuming it's JSON)
    const jsonData = JSON.parse(fileData);
    console.log("data from file", fileData[5859]);
    // Send the data as a JSON response
    return jsonData;
  } catch (error) {
    console.log("data from web");

    const url = `https://api.sleeper.app/v1/players/nfl`;

    const result = await axios.get(url);
    const data = result.data;
    const filePath = path.join(process.cwd(), `src/data/players.json`);
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the data to the file
    fs.writeFileSync(filePath, jsonData, "utf-8");
    return data;
  }
};

const convertPlayersData = async (
  data: SleeperPlayersMap
): Promise<SleeperToSRMap> => {
  const converted: SleeperToSRMap = {};
  Object.keys(data).forEach((key) => {
    const player = data[key];
    converted[key] = {
      sportradar_id: player.sportradar_id,
      name: player.first_name + " " + player.last_name,
      status: player.status,
      team: player.team,
      jerseyNumber: player.number,
      position: player.position,
      points: NaN,
    };
  });
  return converted;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerData | unknown>
) {
  try {
    const data = await getPlayers();
    const converted = await convertPlayersData(data);

    res.status(200).json(converted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
