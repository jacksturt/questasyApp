import { AllPlayerTypes, DefenseStats, SleeperPlayer } from "@/types/native";
import classNames from "classnames";

interface PlayerSectionProps {
  player: AllPlayerTypes;
  starter?: boolean;
  reverse?: boolean;
}

function isDefenseStats(obj: any): obj is DefenseStats {
  return obj && obj.hasOwnProperty("pointsAllowed");
}

export const PlayerSection = ({
  player,
  starter,
  reverse,
}: PlayerSectionProps) => {
  return (
    <div
      className={classNames(
        "flex justify-between gap-4",
        reverse ? "flex-row-reverse" : ""
      )}
    >
      <div className={classNames("flex flex-col", reverse ? "items-end" : "")}>
        <div>{player.name}</div>
        <div>{`${player.position} ${
          isDefenseStats(player) ? "" : player.jerseyNumber
        }`}</div>
      </div>
      <div>{player.points?.toFixed(2) || "-"}</div>
    </div>
  );
  //   }
};
