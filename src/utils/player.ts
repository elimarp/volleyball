export interface Player {
  name: string;
  number: number;
  isCheckedIn: boolean;
}

export const getLocalStoragePlayers = (): Player[] =>
  JSON.parse(localStorage.getItem("players") ?? "[]");

export const setLocalStoragePlayers = (players: Player[]) => {
  localStorage.setItem("players", JSON.stringify(players));
};
export const addLocalStoragePlayer = (newPlayer: Player) => {
  const players: Player[] = JSON.parse(localStorage.getItem("players") ?? "[]");

  if (players.some((player) => player.number === newPlayer.number)) {
    console.log("JÁ EXISTE UM JOGADOR COM ESSE NÚMERO");
    return;
  }

  players.push(newPlayer);
  localStorage.setItem("players", JSON.stringify(players));
};
