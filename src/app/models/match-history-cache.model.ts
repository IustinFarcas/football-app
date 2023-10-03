import { MatchHistoryModel } from './match-history.model';

export class MatchHistoryCacheModel {
  constructor(
    public leagueId: number,
    public lastCacheUpdate: Date,
    public data: MatchHistoryModel[]
  ) {}
}
