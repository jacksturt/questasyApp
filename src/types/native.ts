export type PlayerStats = {
  jerseyNumber: number;
  name: string;
  passYards?: number;
  rushYards?: number;
  receivingYards?: number;
  receptions?: number;
  targets?: number;
  fumbles?: number;
  fumblesLost?: number;
  interceptions?: number;
  twoPointConversions?: number;
  rushingTouchdowns?: number;
  receivingTouchdowns?: number;
  passTouchdowns?: number;
  position: string;
  sportRadarId: string;
  points?: number;
};

export type DefenseStats = {
  pointsAllowed?: number;
  sacks: number;
  fumblesRecovered: number;
  forcedFumbles: number;
  interceptions: number;
  safeties: number;
  blockedKicks: number;
  defensiveTouchdowns: number;
  position: string;
  points?: number;
  name: string;
};

export type KickerStats = {
  attempts19: number;
  attempts29: number;
  attempts39: number;
  attempts49: number;
  attempts50: number;
  made19: number;
  made29: number;
  made39: number;
  made49: number;
  made50: number;
  xpAttempts: number;
  xpMade: number;
  position: string;
  sportRadarId: string;
  points?: number;
  name: string;
  jerseyNumber: number;
};

export type AllPlayerTypes =
  | PlayerStats
  | DefenseStats
  | KickerStats
  | SleeperPlayer;

export type RosterInfo = {
  teamName: string;
  owner: string;
  id: number;
  avatar: string;
  starters: AllPlayerTypes[];
  totalPoints: string;
  leagueId: string;
  //   bench: AllPlayerTypes[];
};

export type SleeperPlayer = {
  sportradar_id: string;
  status?: string;
  position: string;
  name: string;
  jerseyNumber: number;
  team: string;
  points: number;
};

export type SleeperToSRMap = Record<string, SleeperPlayer>;

export type Matchup = {
  home?: RosterInfo;
  away?: RosterInfo;
};
