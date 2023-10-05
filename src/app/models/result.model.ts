import { TeamScoreModel } from './team-score.model';

export class ResultModel {
  constructor(
    public status: string,
    public eventDate: Date,
    public homeTeam: TeamScoreModel,
    public awayTeam: TeamScoreModel
  ) {}
}
