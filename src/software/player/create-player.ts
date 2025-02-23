import { LOCAL_STORAGE_KEYS } from "../global";
import { addPlayerToQueue } from "../queue/queue";
import { getAllPlayers } from "./get-player";

export const getNextPlayerId = (): number => {
  const nextId = Number(
    localStorage.getItem(LOCAL_STORAGE_KEYS.NEXT_PLAYER_ID) ?? "1"
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.NEXT_PLAYER_ID,
    (nextId + 1).toString()
  );

  return nextId;
};

export const createPlayer = (params: {
  id: number;
  name: string;
  checkingIn: boolean;
  rating?: number;
}): boolean => {
  const players = getAllPlayers();
  if (players.some((player) => player.id === params.id)) {
    console.error("Duplicated IDs.");
    return false;
  }

  players.push({
    id: params.id,
    name: params.name,
    rating: params.rating ?? 1000,
    isCheckedIn: params.checkingIn,
    session: {
      gamesWaiting: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
    },
  });

  localStorage.setItem(LOCAL_STORAGE_KEYS.PLAYERS, JSON.stringify(players));

  if (params.checkingIn) {
    addPlayerToQueue(params.id);
  }

  return true;
};
