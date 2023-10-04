export class TeamScoreModel {
  constructor(
    public id: number,
    public name: string,
    public logoUrl: string,
    public goals: number
  ) {}
}

export class MatchHistoryModel {
  constructor(
    public status: string,
    public eventDate: Date,
    public homeTeam: TeamScoreModel,
    public awayTeam: TeamScoreModel
  ) {}
}
