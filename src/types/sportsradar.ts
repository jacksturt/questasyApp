type SRWeather = {
  condition: string;
  humidity: number;
  temp: number;
  wind: {
    speed: number;
    direction: string;
  };
};

type SRSummary = {
  season: {
    id: string;
    year: number;
    type: string;
    name: string;
  };
  week: {
    id: string;
    sequence: number;
    title: string;
  };
  venue: {
    id: string;
    name: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    address: string;
    capacity: number;
    surface: string;
    roof_type: string;
    sr_id: string;
    location: {
      lat: string;
      lng: string;
    };
  };
  home: {
    id: string;
    name: string;
    market: string;
    alias: string;
    sr_id: string;
    used_timeouts: number;
    remaining_timeouts: number;
    points: number;
    used_challenges: number;
    remaining_challenges: number;
    record: {
      wins: number;
      losses: number;
      ties: number;
    };
  };
  away: {
    id: string;
    name: string;
    market: string;
    alias: string;
    sr_id: string;
    used_timeouts: number;
    remaining_timeouts: number;
    points: number;
    used_challenges: number;
    remaining_challenges: number;
    record: {
      wins: number;
      losses: number;
      ties: number;
    };
  };
};

export type SRPlayerStats = {
  id: string;
  name: string;
  jersey: string;
  position: string;
  sr_id: string;
  first_downs: number;
  avg_yards: number;
  attempts: number;
  successes: number;
  touchdowns: number;
  yards: number;
  longest: number;
  redzone_attempts: number;
  tlost: number;
  tlost_yards: number;
  broken_tackles: number;
  kneel_downs: number;
  scrambles: number;
  yards_after_contact: number;
  interceptions: number;
  fumbles: number;
  lost_fumbles: number;
  receptions: number;
  targets: number;
  blocked: number;
  made: number;
  made_19: number;
  made_29: number;
  made_39: number;
  made_49: number;
  made_50: number;

  attempts_19: number;
  attempts_29: number;
  attempts_39: number;
  attempts_49: number;
  attempts_50: number;
};

type SRTeamStats = {
  possession_time: string;
  avg_gain: number;
  safeties: number;
  turnovers: number;
  play_count: number;
  rush_plays: number;
  total_yards: number;
  fumbles: number;
  lost_fumbles: number;
  penalties: number;
  penalty_yards: number;
  return_yards: number;
};

export type SRTeamFullStats = {
  id: number;
  name: string;
  market: string;
  alias: string;
  sr_id: string;
  summary: SRTeamStats;
  rushing: {
    totals: SRTeamStats & {
      longest_touchdown: number;
    };
    players: SRPlayerStats[];
  };
  receiving: {
    totals: SRTeamStats & {
      longest_touchdown: number;
      air_yards: number;
      yards_after_catch: number;
      redzone_targets: number;
      catchable_passes: number;
    };
    players: SRPlayerStats[];
  };
  punts: {
    totals: SRTeamStats & {
      net_yards: number;
      avg_net_yards: number;
      avg_hang_time: number;
    };
    players: SRPlayerStats[];
  };
  punt_returns: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  penalties: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  passing: {
    totals: SRTeamStats & {
      cmp_pct: number;
      int_touchdowns: number;
      throw_aways: number;
      poor_throws: number;
      defended_passes: number;
      dropped_passes: number;
      spikes: number;
      blitzes: number;
      hurries: number;
      knockdowns: number;
      pocket_time: number;
      avg_pocket_time: number;
      batted_passes: number;
      on_target_throws: number;
    };
    players: SRPlayerStats[];
  };
  misc_returns: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  kickoffs: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  kick_returns: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  int_returns: {
    totals: SRTeamStats;
    players: SRPlayerStats[];
  };
  fumbles: {
    totals: SRTeamStats & {
      own_rec: number;
      own_rec_yards: number;
      opp_rec: number;
      opp_rec_yards: number;
      out_of_bounds: number;
      forced_fumbles: number;
      own_rec_tds: number;
      opp_rec_tds: number;
      ez_rec_tds: number;
    };
    players: SRPlayerStats[];
  };
  field_goals: {
    totals: SRTeamStats & {
      net_attempts: number;
      missed: number;
      pct: number;
      attempts_19: number;
      attempts_29: number;
      attempts_39: number;
      attempts_49: number;
      attempts_50: number;
      made_19: number;
      made_29: number;
      made_39: number;
      made_49: number;
      made_50: number;
    };
    players: SRPlayerStats[];
  };
  defense: {
    totals: {
      tackles: number;
      assists: number;
      combined: number;
      sacks: number;
      sack_yards: number;
      interceptions: number;
      passes_defended: number;
      forced_fumbles: number;
      fumble_recoveries: number;
      qb_hits: number;
      tloss: number;
      tloss_yards: number;
      safeties: number;
      sp_tackles: number;
      sp_assists: number;
      sp_forced_fumbles: number;
      sp_fumble_recoveries: number;
      sp_blocks: number;
      misc_tackles: number;
      misc_assists: number;
      misc_forced_fumbles: number;
      misc_fumble_recoveries: number;
      def_targets: number;
      def_comps: number;
      blitzes: number;
      hurries: number;
      knockdowns: number;
      missed_tackles: number;
      batted_passes: number;
      three_and_outs_forced: number;
      fourth_down_stops: number;
    };
    players: SRPlayerStats[];
  };
  extra_points: {
    kicks: {
      totals: SRTeamStats & {
        attempts: number;
        blocked: number;
        made: number;
        missed: number;
        pct: number;
      };
      players: SRPlayerStats[];
    };

    conversions: {
      totals: SRTeamStats & {
        pass_attempts: number;
        pass_successes: number;
        rush_attempts: number;
        rush_successes: number;
        defense_attempts: number;
        defense_successes: number;
      };
      players: SRPlayerStats[];
    };
  };
  first_downs: {
    pass: number;
    penalty: number;
    rush: number;
    total: number;
  };
  interceptions: {
    return_yards: number;
    returned: number;
    number: number;
  };
  touchdowns: {
    pass: number;
    rush: number;
    total_return: number;
    total: number;
    fumble_return: number;
    int_return: number;
    kick_return: number;
    punt_return: number;
    other: number;
  };
  efficiency: {
    goaltogo: {
      attempts: number;
      successes: number;
      pct: number;
    };
    redzone: {
      attempts: number;
      successes: number;
      pct: number;
    };
    thirddown: {
      attempts: number;
      successes: number;
      pct: number;
    };
    fourthdown: {
      attempts: number;
      successes: number;
      pct: number;
    };
  };
};

export type SRGameStatistics = {
  home: SRTeamFullStats;
  away: SRTeamFullStats;
  _comment: string;
};

export type SRGameData = {
  id: string;
  status: string;
  scheduled: string;
  attendance: number;
  entry_mode: string;
  clock: string;
  quarter: number;
  sr_id: string;
  game_type: string;
  conference_game: boolean;
  duration: string;
  weather: SRWeather;
  summary: SRSummary;
  statistics: SRGameStatistics;
};
