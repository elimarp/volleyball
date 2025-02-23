import { getAllPlayers } from "../player/get-player";
import { balanceTeams } from "./balance-teams";
import { getCourt, setCourt } from "./court";

export const balanceCourtTeams = () => {
  const court = getCourt();
  const allPlayers = getAllPlayers();

  if (court.teams.a.length !== 6 || court.teams.b.length !== 6) {
    console.error("First set both team to the court.");
    return;
  }

  const playersWithRatings = [
    ...court.teams.a.map((playerId) => {
      const player = allPlayers.find((item) => item.id === playerId)!;
      return { id: player.id, rating: player.rating };
    }),
    ...court.teams.b.map((playerId) => {
      const player = allPlayers.find((item) => item.id === playerId)!;
      return { id: player.id, rating: player.rating };
    }),
  ];

  console.log("Balancing teams", playersWithRatings);

  const [newTeamA, newTeamB] = balanceTeams(playersWithRatings);

  court.teams.a = newTeamA;
  court.teams.b = newTeamB;

  setCourt(court);

  console.log("new teams", newTeamA, newTeamB);
};
