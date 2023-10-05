import { TeamStanding } from "./team-standings.interface";

export interface League {
    league: {
      id: number;
      season: number;
      standings: TeamStanding[][];
    };
  }
  