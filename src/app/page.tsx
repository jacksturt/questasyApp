"use client";
import { getRosters, getUsers } from "@/api/sleeper";
import { PlayerSection } from "@/components/playerSection";
import { ABBREVIATION_TO_TEAM_NAME } from "@/constants";
import {
  ALL_LEAGUES,
  WEEK_16_MAPPINGS,
  WEEK_16_TEAMS,
  WEEK_17_MAPPINGS,
  WEEK_17_TEAMS,
} from "@/constants/sleeper";
import { PlayerData } from "@/helpers/dataConversion";
import {
  calculateOffsetForMatchup,
  getPointsForPlayer,
} from "@/helpers/pointsCalculation";
import {
  AllPlayerTypes,
  Matchup,
  RosterInfo,
  SleeperToSRMap,
} from "@/types/native";
import { SleeperRosterInfo, SleeperUserInfo } from "@/types/sleeper";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [rawRosters, setRawRosters] = useState<SleeperRosterInfo[] | null>(
    null
  );
  const [matchups, setMatchups] = useState<Matchup[] | null>(null);
  const [matchupNumber, setMatchupNumber] = useState<number>(0);

  const [rawUsers, setRawUsers] = useState<SleeperUserInfo[] | null>(null);
  const [playersData, setPlayersData] = useState<PlayerData | null>(null);
  const [playerIdMap, setPlayerIdMap] = useState<SleeperToSRMap | null>(null);
  const [rosters, setRosters] = useState<RosterInfo[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const rosters: SleeperRosterInfo[] = [];
      const getAllRosters = ALL_LEAGUES.map(async (league) => {
        const data = await getRosters(league);
        rosters.push(...data);
      });
      await Promise.all(getAllRosters);
      setRawRosters(rosters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const users: SleeperUserInfo[] = [];
      const getAllRosters = ALL_LEAGUES.map(async (league) => {
        const data = await getUsers(league);
        users.push(...data);
      });
      await Promise.all(getAllRosters);
      setRawUsers(users);
      console.log(users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/getGamesForWeek");
      setPlayersData(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/getPlayers");
      setPlayerIdMap({ ...response.data, ...ABBREVIATION_TO_TEAM_NAME });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!playersData || !playerIdMap || !rawRosters || !rawUsers) return;
    const rosters = [];
    const matchups: Matchup[] = [
      {
        home: undefined,
        away: undefined,
      },
    ];
    for (const roster of rawRosters) {
      if (!WEEK_17_TEAMS.includes(roster.owner_id)) continue;
      let totalPoints = 0;
      const user = rawUsers.find((user) => user.user_id === roster.owner_id);
      const rosterData = {
        id: roster.roster_id,
        owner: roster.owner_id,
        leagueId: roster.league_id,
        teamName: user?.metadata.team_name || "Team " + user?.display_name,
        avatar: "https://sleepercdn.com/avatars/thumbs/" + user?.avatar,
        starters: roster.starters.map((player) => {
          // debugger;
          if (player === "0") {
            return {
              name: "Empty",
              position: "Empty",
              team: "Empty",
              jerseyNumber: -1,
              sportradar_id: "Empty",
              status: "Empty",
            };
          }
          const playerInfo = playerIdMap[player];
          const playerData = playersData[playerInfo.sportradar_id];
          if (!playerData) {
            if (Object.keys(ABBREVIATION_TO_TEAM_NAME).includes(player)) {
              return {
                name: playerInfo.sportradar_id + " Defense",
                position: "DEF",
                points: undefined,
                team: playerInfo.sportradar_id,
                // jerseyNumber: -1,
                sportradar_id: playerInfo.sportradar_id,
                status: "Empty",
                pointsAllowed: 0,
              };
            }
            return playerInfo;
          }
          const points = getPointsForPlayer(playerData);
          totalPoints += points;
          return { ...playerData, points };
        }),
        // players: roster.players.map((player) => {
        //   const playerId = playerIdMap[player];
        //   if (!playerId) {
        //     console.log(playerId, player);
        //   }
        //   const playerData = playersData[playerId];
        //   const points = getPointsForPlayer(playerData);
        //   return { ...playerData, points };
        // }),
      };
      const allData: RosterInfo = {
        ...rosterData,
        totalPoints: totalPoints.toFixed(2),
      };
      rosters.push(allData);
      const rosterMatchupInfo = WEEK_17_MAPPINGS[roster.owner_id];
      matchups[rosterMatchupInfo.matchup][rosterMatchupInfo.team] = allData;
    }
    setRosters(rosters);
    matchups.forEach((matchup) => {
      const offset = calculateOffsetForMatchup(matchup.away!, matchup.home!);
      const offsetText =
        offset === 0
          ? ""
          : " (" + (offset > 0 ? "+" : "") + offset.toFixed(2) + ")";

      matchup.away!.totalPointsWithOffset =
        matchup.away?.totalPoints + offsetText;

      matchup.away!.totalPoints = (
        parseFloat(matchup.away!.totalPoints) + offset
      ).toFixed(2);
    });
    setMatchups(matchups);
  }, [playersData, playerIdMap, rawRosters, rawUsers]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col md:flex-row gap-4 md:gap-20 mb-10 md:mb-0">
        {matchups &&
          matchups.map((matchup, index) => (
            <button
              key={index}
              className=""
              onClick={() => {
                setMatchupNumber(index);
              }}
            >
              <div className="flex flex-col md:flex-row md:gap-2">
                <div>{matchup.away?.teamName}</div>
                <div> vs </div>
                <div>{matchup.home?.teamName}</div>
              </div>

              <div>
                {matchup.away?.totalPoints} vs {matchup.home?.totalPoints}
              </div>
            </button>
          ))}
      </div>
      <div className="flex gap-4 md:gap-20 items-start justify-center">
        <div>
          {matchups && (
            <div>
              <Image
                src={matchups[matchupNumber].away?.avatar || ""}
                width={24}
                height={24}
                alt="avatar"
                className="rounded-full"
              />
              <div>{matchups[matchupNumber].away?.teamName}</div>
              <div>
                Total Points:{" "}
                {matchups[matchupNumber].away?.totalPointsWithOffset}
              </div>
              {matchups[matchupNumber].away?.starters.map(
                (player: AllPlayerTypes) => (
                  <PlayerSection player={player} key={player.name} />
                )
              )}
            </div>
          )}
        </div>
        <div className="text-sm md:text-[128px] ">VS</div>
        <div>
          {matchups && (
            <div>
              <div className="flex flex-col items-end justify-between">
                <Image
                  src={matchups[matchupNumber].home?.avatar || ""}
                  width={24}
                  height={24}
                  alt="avatar"
                  className="rounded-full"
                />
                <div>{matchups[matchupNumber].home?.teamName}</div>
                <div>
                  Total Points: {matchups[matchupNumber].home?.totalPoints}
                </div>
              </div>
              {matchups[matchupNumber].home?.starters.map(
                (player: AllPlayerTypes) => (
                  <PlayerSection
                    player={player}
                    key={player.name}
                    reverse={true}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
