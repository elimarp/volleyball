import { getCourt, setCourt } from "../court/court";
import { getAllPlayers, setAllPlayers } from "../player/get-player";
import { addPlayerToQueue, getQueue, setQueue } from "../queue/queue";
import { eloRating } from "../rating/update-rating";
import { Court } from "../types.index";

export const endGame = (winningTeam: keyof Court["teams"]) => {
  console.log("endGame", { winningTeam });

  const court = getCourt();

  if (court.teams.a.length !== 6 || court.teams.b.length !== 6) {
    console.error("No game going on.");
    return;
  }
  const queue = getQueue();
  const allPlayers = getAllPlayers();

  const losingTeam = winningTeam === "a" ? "b" : "a";

  const winningTeamAverageRating =
    court.teams[winningTeam].reduce((sum, playerId) => {
      const player = allPlayers.find((item) => item.id === playerId)!;

      return sum + player.rating;
    }, 0) / 6;

  const losingTeamAverageRating =
    court.teams[losingTeam].reduce((sum, playerId) => {
      const player = allPlayers.find((item) => item.id === playerId)!;

      return sum + player.rating;
    }, 0) / 6;

  for (const playerId of court.teams[winningTeam]) {
    const player = allPlayers.find((item) => item.id === playerId)!;

    player.session.gamesPlayed++;
    player.session.gamesWon++;
    player.session.gamesWaiting = 0;

    player.rating = Math.round(
      eloRating(player.rating, losingTeamAverageRating, 40, 1)[0]
    );
  }

  for (const playerId of court.teams[losingTeam]) {
    const player = allPlayers.find((item) => item.id === playerId)!;

    player.session.gamesPlayed++;
    player.session.gamesLost++;
    player.session.gamesWaiting = 0;

    player.rating = Math.round(
      eloRating(player.rating, winningTeamAverageRating, 40, 0)[0]
    );
  }

  for (const playerId of queue) {
    const player = allPlayers.find((item) => item.id === playerId)!;

    player.session.gamesWaiting++;
  }

  setAllPlayers(allPlayers);
  setQueue(queue);

  for (const playerId of court.teams[losingTeam]) {
    addPlayerToQueue(playerId);
  }

  court.teams[losingTeam] = [];
  setCourt(court);

  logCheckpoint();
  return;
};

const logCheckpoint = () => {
  const court = getCourt();
  const queue = getQueue();
  const allPlayers = getAllPlayers();

  let i = 0;
  for (const playerId of [...court.teams.a, ...court.teams.b, ...queue]) {
    const {
      id,
      name,
      rating,
      session: { gamesWaiting, gamesPlayed, gamesWon, gamesLost },
    } = allPlayers.find((item) => item.id === playerId)!;

    console.log(i > 5 ? i - 6 + 1 : i + 1, {
      q: gamesWaiting,
      p: gamesPlayed,
      w: gamesWon,
      // l: gamesLost,
      r: rating,
      id,
      name,
    });
    i++;
    if (i === 6) console.log("-----------------------------------");
  }
};
