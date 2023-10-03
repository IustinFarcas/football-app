import { StandingModel } from './standing.model';

export class StandingsCacheModel {
  constructor(
    public leagueId: number,
    public lastCacheUpdate: Date,
    public data: StandingModel[]
  ) {}
}
