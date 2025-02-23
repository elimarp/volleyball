import { LOCAL_STORAGE_KEYS } from "../global";
import { getAllPlayers, getPlayer } from "../player/get-player";
import { Queue } from "../types.index";

export const getQueue = (): Queue => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.QUEUE) ?? "[]");
};

export const setQueue = (queue: Queue) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.QUEUE, JSON.stringify(queue));
};

export const addPlayerToQueue = (playerId: number) => {
  const addingPlayer = getPlayer(playerId);
  const queue = getQueue();
  const allPlayers = getAllPlayers();

  if (queue.some((item) => item === playerId)) {
    console.error(`Player ${playerId} already in queue.`);
    return;
  }

  // NOTE: this may cause/fix some bugs
  addingPlayer.session.gamesWaiting = 0;

  let playerAdded: boolean = false;

  for (let index = 0; index < queue.length; index++) {
    const queuePlayer = allPlayers.find(
      (player) => player.id === queue[index]
    )!;
    if (
      queuePlayer.session.gamesPlayed !== 0 &&
      addingPlayer.session.gamesPlayed === 0
    ) {
      queue.splice(index, 0, addingPlayer.id);
      playerAdded = true;
      // console.log(
      //   `Player ${addingPlayer.id} added to queue at position ${index} 'cause ${queuePlayer.id} have already played.`
      // );
      break;
    }

    if (
      queuePlayer.session.gamesWaiting === 0 &&
      addingPlayer.session.gamesPlayed < queuePlayer.session.gamesPlayed
    ) {
      queue.splice(index, 0, addingPlayer.id);
      playerAdded = true;
      // console.log(
      //   `Player ${addingPlayer.id} added to queue at position ${index} 'cause ${queuePlayer.id} have played more games (and both were just added to queue).`
      // );
      break;
    }
  }

  if (!playerAdded) {
    queue.push(addingPlayer.id);
    // console.log(`Player ${addingPlayer.id} added to the end of the queue.`);
  }

  setQueue(queue);
  return;
};

export const removePlayerFromQueue = (playersId: number) => {
  const queue = getQueue();

  const deletingIndex = queue.findIndex(
    (queuePlayerId) => queuePlayerId === playersId
  );

  if (deletingIndex === -1) {
    console.error(`Player ${playersId} wa not in the queue.`);
    return;
  }

  queue.splice(deletingIndex, 1);

  setQueue(queue);
};
