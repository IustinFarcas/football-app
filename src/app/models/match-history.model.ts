import { IModel } from './model.interface';

export class TeamScoreModel {
  constructor(
    public id: number,
    public name: string,
    public logoUrl: string,
    public goals: number
  ) {}
}

export class MatchHistoryModel implements IModel {
  constructor(
    public status: string,
    public homeTeam: TeamScoreModel,
    public awayTeam: TeamScoreModel
  ) {}
}
