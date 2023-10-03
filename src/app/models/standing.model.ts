import { IModel } from "./model.interface";


export class StandingModel implements IModel {
  constructor(
    public teamId: number,
    public rank: number,
    public name: string,
    public logoUrl: string,
    public games: number,
    public points: number,
    public goalsDiff: number,
    public wins: number,
    public draws: number,
    public losses: number
  ) {}
}
