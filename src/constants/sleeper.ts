import { Matchup } from "@/types/native";

export const LEAGUE_1_ID = "999761008103067648";
export const LEAGUE_2_ID = "1003091416626683904";
export const LEAGUE_3_ID = "1003692357414719488";
export const ALL_LEAGUES = [LEAGUE_1_ID, LEAGUE_2_ID, LEAGUE_3_ID];

export const WEEK_15_TEAMS: string[] = [
  "719794343593963520",
  "472226347943456768",
  "1000055348318015488",
  "1003664384036634624",
  "470291496407396352",
  "620802595920891904",
  "1003141180391059456",
  "1003409657097990144",
];

export const WEEK_15_MAPPINGS: Record<
  string,
  { matchup: number; team: "home" | "away" }
> = {
  "719794343593963520": { matchup: 0, team: "home" },
  "472226347943456768": { matchup: 0, team: "away" },
  "1000055348318015488": { matchup: 1, team: "home" },
  "1003664384036634624": { matchup: 1, team: "away" },
  "470291496407396352": { matchup: 2, team: "home" },
  "620802595920891904": { matchup: 2, team: "away" },
  "1003141180391059456": { matchup: 3, team: "home" },
  "1003409657097990144": { matchup: 3, team: "away" },
};
