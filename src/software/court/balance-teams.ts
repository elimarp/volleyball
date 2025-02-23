export function balanceTeams(
  players: { id: number; rating: number }[]
): [number[], number[]] {
  // Step 1: Sort ratings in descending order
  // ratings.sort((a, b) => b - a);
  const sortedPlayers = players.sort((a, b) => b.rating - a.rating);

  let teamA: number[] = [
    sortedPlayers[0].id,
    sortedPlayers[3].id,
    sortedPlayers[4].id,
    sortedPlayers[7].id,
    sortedPlayers[8].id,
    sortedPlayers[11].id,
  ];
  let teamB: number[] = [
    sortedPlayers[1].id,
    sortedPlayers[2].id,
    sortedPlayers[5].id,
    sortedPlayers[6].id,
    sortedPlayers[9].id,
    sortedPlayers[10].id,
  ];

  return [teamA, teamB];
}

// export function balanceTeams(ratings: number[]): [number[], number[]] {
//   // Step 1: Sort ratings in descending order
//   ratings.sort((a, b) => b - a);

//   let teamA: number[] = [];
//   let teamB: number[] = [];
//   let sumA = 0,
//     sumB = 0;

//   // Step 3: Assign players in a zigzag pattern
//   for (let i = 0; i < ratings.length; i++) {
//     if (i % 2 === 0) {
//       teamA.push(ratings[i]);
//       sumA += ratings[i];
//     } else {
//       teamB.push(ratings[i]);
//       sumB += ratings[i];
//     }
//   }

//   // Step 4: Optimize balance
//   let diff = Math.abs(sumA - sumB);
//   if (diff > 0) {
//     for (let i = 0; i < 6; i++) {
//       for (let j = 0; j < 6; j++) {
//         // Try swapping to balance the teams
//         let newSumA = sumA - teamA[i] + teamB[j];
//         let newSumB = sumB - teamB[j] + teamA[i];
//         if (Math.abs(newSumA - newSumB) < diff) {
//           [teamA[i], teamB[j]] = [teamB[j], teamA[i]];
//           return [teamA, teamB]; // Return after first successful swap
//         }
//       }
//     }
//   }

//   return [teamA, teamB];
// }

// Example Usage:
// const ratings = [
//   2200, 2000, 1950, 1900, 1850, 1800, 1750, 1700, 1650, 1600, 1550, 1500,
// ];
// const [teamA, teamB] = balanceTeams(ratings);
// console.log("Team A:", teamA);
// console.log("Team B:", teamB);
