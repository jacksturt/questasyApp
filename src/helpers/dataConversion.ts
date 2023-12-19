import { SRGameData, SRTeamFullStats } from "@/types";
import { AllPlayerTypes, DefenseStats } from "@/types/native";
import { SleeperRosterInfo } from "@/types/sleeper";

export type PlayerData = Record<string | "DEF", AllPlayerTypes>;

export const convertTeamStats = (teamStats: SRTeamFullStats): PlayerData => {
  const players: PlayerData = {
    [teamStats.name]: {
      jerseyNumber: -1,
      name: teamStats.name + " Defense",
      sacks: teamStats.defense.totals.sacks,
      fumblesRecovered: teamStats.defense.totals.fumble_recoveries,
      forcedFumbles: teamStats.defense.totals.forced_fumbles,
      interceptions: teamStats.defense.totals.interceptions,
      safeties: teamStats.defense.totals.safeties,
      blockedKicks: teamStats.defense.totals.sp_blocks,
      defensiveTouchdowns: teamStats.touchdowns.total_return,
      position: "DEF",
    },
  };

  for (const player of teamStats.passing.players) {
    const srId = player.id;
    players[srId] = {
      jerseyNumber: parseInt(player.jersey),
      name: player.name,
      passYards: player.yards,
      passTouchdowns: player.touchdowns,
      interceptions: player.interceptions,
      position: player.position,
      sportRadarId: player.id,
    };
  }
  for (const player of teamStats.rushing.players) {
    const extraData = players[player.id] || {
      jerseyNumber: parseInt(player.jersey),
      name: player.name,
      position: player.position,
    };
    players[player.id] = {
      rushYards: player.yards,
      rushingTouchdowns: player.touchdowns,
      ...extraData,
    };
  }
  for (const player of teamStats.receiving.players) {
    const extraData = players[player.id] || {
      jerseyNumber: parseInt(player.jersey),
      name: player.name,
      position: player.position,
    };
    players[player.id] = {
      receivingYards: player.yards,
      receivingTouchdowns: player.touchdowns,
      receptions: player.receptions,
      targets: player.targets,
      ...extraData,
    };
  }

  for (const player of teamStats.fumbles.players) {
    const jerseyNumber = parseInt(player.jersey);

    const extraData = players[player.id] || {
      jerseyNumber,
      name: player.name,
      position: player.position,
    };
    players[player.id] = {
      fumbles: player.fumbles,
      fumblesLost: player.fumbles_lost,
      ...extraData,
    };
  }

  for (const player of teamStats.extra_points.conversions.players) {
    const jerseyNumber = parseInt(player.jersey);

    const extraData = players[player.id] || {
      jerseyNumber,
      name: player.name,
      position: player.position,
    };
    players[player.id] = {
      twoPointConversions: player.successes,
      ...extraData,
    };
  }

  for (const player of teamStats.field_goals.players) {
    const jerseyNumber = parseInt(player.jersey);

    const extraData = players[player.id] || {
      jerseyNumber,
      name: player.name,
      position: "K",
    };
    players[player.id] = {
      made19: player.made_19,
      made29: player.made_29,
      made39: player.made_39,
      made49: player.made_49,
      made50: player.made_50,
      attempts19: player.attempts_19,
      attempts29: player.attempts_29,
      attempts39: player.attempts_39,
      attempts49: player.attempts_49,
      attempts50: player.attempts_50,
      ...extraData,
    };
  }

  for (const player of teamStats.extra_points.kicks.players) {
    const jerseyNumber = parseInt(player.jersey);
    if (isNaN(jerseyNumber)) {
      continue;
    }
    const extraData = players[player.id] || {
      jerseyNumber,
      name: player.name,
      position: "K",
    };
    players[player.id] = {
      xpAttempts: player.attempts,
      xpMade: player.made,
      ...extraData,
    };
  }

  return players;
};

export const convertGameStats = (gameStats: SRGameData): PlayerData => {
  const homeTeamPlayers = convertTeamStats(gameStats.statistics.home);
  const awayTeamPlayers = convertTeamStats(gameStats.statistics.away);
  const teams: PlayerData = { ...homeTeamPlayers, ...awayTeamPlayers };

  (teams[gameStats.statistics.home.name] as DefenseStats).pointsAllowed =
    gameStats.summary.away.points -
    6 *
      (gameStats.statistics.away.touchdowns.fumble_return +
        gameStats.statistics.away.touchdowns.int_return);
  (teams[gameStats.statistics.away.name] as DefenseStats).pointsAllowed =
    gameStats.summary.home.points -
    6 *
      (gameStats.statistics.home.touchdowns.fumble_return +
        gameStats.statistics.home.touchdowns.int_return);

  //   console.log(teams);
  return teams;
};

export const convertRosterInfo = (rosterInfo: SleeperRosterInfo) => {};
