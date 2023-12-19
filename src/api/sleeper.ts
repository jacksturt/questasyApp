import { SleeperRosterInfo, SleeperUserInfo } from "@/types/sleeper";
import axios from "axios";

const SLEEPER_API_BASE = "https://api.sleeper.app";
export const QUESTASY_LEAGUE_2_ID = "1003091416626683904";
export const GAME_ID = "7f4a2ce0-6d10-46a1-8cb5-09bae643e9d7";

export const getRosters = async (id: string): Promise<SleeperRosterInfo[]> => {
  const url = `${SLEEPER_API_BASE}/v1/league/${id}/rosters`;

  const result = await axios.get(url);
  if (result) {
    console.log(result);
    return result.data;
  }
  return [];
};

export const getUsers = async (id: string): Promise<SleeperUserInfo[]> => {
  const url = `${SLEEPER_API_BASE}/v1/league/${id}/users`;

  const result = await axios.get(url);
  if (result) {
    console.log(result);
    return result.data;
  }
  return [];
};
