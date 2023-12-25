import { LEAGUE_1_OFFSET, LEAGUE_3_OFFSET } from "@/constants/native";
import { LEAGUE_1_ID, LEAGUE_2_ID, LEAGUE_3_ID } from "@/constants/sleeper";
import {
  AllPlayerTypes,
  DefenseStats,
  KickerStats,
  PlayerStats,
  RosterInfo,
} from "@/types/native";

export const pointsAllowedConversion = (points: number): number => {
  if (points === 0) return 10;
  if (points <= 6) return 7;
  if (points <= 13) return 4;
  if (points <= 20) return 1;
  if (points <= 27) return 0;
  if (points <= 34) return -1;
  return -4;
};

export const getPointsForDefense = (player: DefenseStats): number => {
  let sum = 0;
  sum += (player.sacks || 0) * 1;
  sum += (player.fumblesRecovered || 0) * 2;
  sum += player.forcedFumbles || 0;
  sum += (player.interceptions || 0) * 2;
  sum += (player.safeties || 0) * 2;
  sum += (player.blockedKicks || 0) * 2;
  sum += (player.defensiveTouchdowns || 0) * 6;
  const pointsAllowed = pointsAllowedConversion(player.pointsAllowed || 0);
  return sum + pointsAllowed;
};

export const getPointsForKicker = (player: KickerStats): number => {
  let sum = 0;
  sum += (player.made19 || 0) * 3;
  sum += (player.made29 || 0) * 3;
  sum += (player.made39 || 0) * 3;
  sum += (player.made49 || 0) * 4;
  sum += (player.made50 || 0) * 5;
  sum += player.xpMade || 0;
  sum -= (player.xpAttempts || 0) - (player.xpMade || 0);
  sum -= (player.attempts19 || 0) - (player.made19 || 0);
  sum -= (player.attempts29 || 0) - (player.made29 || 0);

  return sum;
};

export const getPointsForSkillPosition = (player: PlayerStats): number => {
  let sum = 0;
  sum += (player.passYards || 0) * 0.04;
  sum += (player.rushYards || 0) * 0.1;
  sum += (player.receivingYards || 0) * 0.1;
  sum += (player.receptions || 0) * 0.5;
  sum += (player.passTouchdowns || 0) * 4;
  sum += (player.rushingTouchdowns || 0) * 6;
  sum += (player.receivingTouchdowns || 0) * 6;
  sum += (player.interceptions || 0) * -2;
  sum += (player.fumblesLost || 0) * -2;
  console.log("sumpre", sum);

  sum += (player.twoPointConversions || 0) * 2;
  console.log("sum", sum);
  return sum;
};

export const getPointsForPlayer = (player: AllPlayerTypes): number => {
  if (!player) {
    console.log("bad player", player);
    return 0;
  }

  switch (player.position) {
    case "DEF":
      return getPointsForDefense(player as DefenseStats);
    case "K":
      return getPointsForKicker(player as KickerStats);
    default:
      return getPointsForSkillPosition(player as PlayerStats);
  }
};

const getOffsetForLeague = (leagueId: string): number => {
  if (leagueId === LEAGUE_1_ID) return LEAGUE_1_OFFSET;
  if (leagueId === LEAGUE_2_ID) return 0;
  if (leagueId === LEAGUE_3_ID) return LEAGUE_3_OFFSET;
  return 0;
};

export const calculateOffsetForMatchup = (
  roster1: RosterInfo,
  roster2: RosterInfo
): number => {
  let sum = 0;

  sum += getOffsetForLeague(roster1.leagueId);
  sum -= getOffsetForLeague(roster2.leagueId);

  return sum;
};
