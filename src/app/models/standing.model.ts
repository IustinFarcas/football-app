
export class StandingModel {
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
