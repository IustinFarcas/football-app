import { League } from "./league.interface";

export interface StandigsResponse {
  errors: Object;
  results: number;
  response: League[];
}
