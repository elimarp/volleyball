export type Player = {
  id: number;
  name: string;
  rating: number;
  isCheckedIn: boolean;
  session: {
    gamesWaiting: number;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
  };
};

export type Queue = Player["id"][];

export type Court = {
  teams: {
    a: Player["id"][];
    b: Player["id"][];
  };
};
