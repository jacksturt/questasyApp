export type SleeperRosterInfo = {
  starters: string[];
  settings: {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    total_moves: number;
    ties: number;
    losses: number;
    fpts_decimal: number;
    fpts_against_decimal: number;
    fpts_against: number;
    fpts: number;
  };
  roster_id: number;
  reserve: string[];
  players: string[];
  owner_id: string;
  league_id: string;
};

type SleeperPlayerInfo = {
  hashtag: string;
  depth_chart_position: number;
  status: string;
  sport: string;
  fantasy_positions: string[];
  number: number;
  search_last_name: string;
  injury_start_date: null | string;
  weight: string;
  position: string;
  practice_participation: null | string;
  sportradar_id: string;
  team: string;
  last_name: string;
  college: string;
  fantasy_data_id: number;
  injury_status: null | string;
  player_id: string;
  height: string;
  search_full_name: string;
  age: number;
  stats_id: string;
  birth_country: string;
  espn_id: string;
  search_rank: number;
  first_name: string;
  depth_chart_order: number;
  years_exp: number;
  rotowire_id: null | string;
  rotoworld_id: number;
  search_first_name: string;
  yahoo_id: null | string;
};

export type SleeperPlayersMap = Record<string, SleeperPlayerInfo>;

export type SleeperUserInfo = {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
  metadata: {
    team_name: string;
  };
  is_owner: boolean;
};
