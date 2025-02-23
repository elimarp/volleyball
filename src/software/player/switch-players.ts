import { getCourt, setCourt } from "../court/court";
import { getQueue, setQueue } from "../queue/queue";
import { Court } from "../types.index";

// TODO: clean winstreak?
export const switchPlayers = (
  playerX: SwitchingPlayer,
  playerY: SwitchingPlayer
) => {
  // console.log("switchPlayers", playerX, playerY);
  const queue = getQueue();
  const court = getCourt();

  if (playerX.place === "queue") {
    queue[playerX.index] = playerY.id;
  } else {
    court.teams[playerX.place][playerX.index] = playerY.id;
  }

  if (playerY.place === "queue") {
    queue[playerY.index] = playerX.id;
  } else {
    court.teams[playerY.place][playerY.index] = playerX.id;
  }

  setCourt(court);
  setQueue(queue);
  console.log(`Positions of ${playerX.id} and ${playerY.id} were switched.`);
};

type SwitchingPlayer = {
  id: number;
  place: keyof Court["teams"] | "queue";
  index: number;
};
