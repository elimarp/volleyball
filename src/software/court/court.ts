import { LOCAL_STORAGE_KEYS } from "../global";
import { getQueue, setQueue } from "../queue/queue";
import { Court } from "../types.index";

const initialCourt: Court = {
  teams: {
    a: [],
    b: [],
  },
  // TODO: winstreak
};

export const getCourt = (): Court => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.COURT) ??
      JSON.stringify(initialCourt)
  );
};

export const setCourt = (court: Court) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.COURT, JSON.stringify(court));
};

export const addTeamToCourt = () => {
  const court = getCourt();
  const queue = getQueue();
  if (court.teams.a.length > 0 && court.teams.b.length > 0) {
    console.error(`Both teams are already settled.`);
    return;
  }

  if (queue.length < 6) {
    console.error(`Not enough players in queue.`);
    return;
  }

  const addingTeam: number[] = [
    queue.shift()!,
    queue.shift()!,
    queue.shift()!,
    queue.shift()!,
    queue.shift()!,
    queue.shift()!,
  ];

  if (court.teams.a.length > 0) {
    court.teams.b = addingTeam;
  } else {
    court.teams.a = addingTeam;
  }

  setCourt(court);
  setQueue(queue);
  console.log(
    `${addingTeam.join(", ")} entered the court (removed from queue).`
  );
  return;
};
