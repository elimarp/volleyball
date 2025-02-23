// Function to calculate the Probability
function probability(rating1: number, rating2: number) {
  // Calculate and return the expected score
  return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
}

// Function to calculate Elo rating
// K is a constant.
// outcome determines the outcome: 1 for Player A win, 0 for Player B win, 0.5 for draw.
export function eloRating(
  Ra: number,
  Rb: number,
  K: number,
  outcome: 1 | 0
): [number, number] {
  // console.log({ Ra, Rb, outcome });

  // Calculate the Winning Probability of Player B
  let Pb = probability(Ra, Rb);

  // Calculate the Winning Probability of Player A
  let Pa = probability(Rb, Ra);

  // Update the Elo Ratings
  Ra = Ra + K * (outcome - Pa);
  Rb = Rb + K * (1 - outcome - Pb);

  // Print updated ratings
  // console.log("Updated Ratings:-");
  // console.log(`Ra = ${Ra} Rb = ${Rb}`);
  return [Ra, Rb];
}

// // Current ELO ratings
// let Ra = 1200,
//   Rb = 1000;

// // K is a constant
// let K = 30;

// // Outcome: 1 for Player A win, 0 for Player B win, 0.5 for draw
// let outcome = 1;

// // Function call
// eloRating(Ra, Rb, K, outcome);
