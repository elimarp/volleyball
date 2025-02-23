import { LOCAL_STORAGE_KEYS } from "../global";
import { Player } from "../types.index";

export const getPlayer = (id: number): Player => {
  const players = getAllPlayers();
  const player = players.find((player) => player.id === id);

  if (!player) throw new Error(`Player ${id} not found.`);

  return player;
};

export const getAllPlayers = (): Player[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLAYERS) ?? "[]");
};

export const setAllPlayers = (players: Player[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.PLAYERS, JSON.stringify(players));
};
