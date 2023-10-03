import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MatchHistoryCacheModel } from '../models/match-history-cache.model';
import { MatchHistoryModel } from '../models/match-history.model';
import { addHours, leagueIdToLeagueName } from '../utils';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class MatchHistoryService {
  matchFinishedStatus: string = 'FT';
  constructor(private api: ApiService, private cache: CacheService) {}

  async getTeamResultsHistory(
    leagueId: number,
    teamId: number
  ): Promise<MatchHistoryModel[]> {
    const key = leagueIdToLeagueName[leagueId] + ' - Results';

    const lastCacheUpdate = (
      this.cache.readFromCache(key) as MatchHistoryCacheModel
    )?.lastCacheUpdate;

    const shouldRefreshCache: boolean =
      lastCacheUpdate === undefined ||
      addHours(lastCacheUpdate, 3) < new Date();

    if (shouldRefreshCache) {
      await this.refreshCache(leagueId, key);
    }
    return this.getTeamResultsFromCache(teamId, key);
  }

  private async refreshCache(leagueId: number, key: string): Promise<void> {
    const data = await firstValueFrom(this.api.getFinishedMatches(leagueId));
    if (data) {
      await this.cache.writeToCache(
        new MatchHistoryCacheModel(leagueId, new Date(), data),
        key
      );
    }
  }

  private getTeamResultsFromCache(
    teamId: number,
    key: string
  ): MatchHistoryModel[] {
    const data = this.cache.readFromCache<MatchHistoryCacheModel>(key)?.data;
    return data
      ? data.filter((r) => {
          return (
            r.status == this.matchFinishedStatus &&
            (r.homeTeam.id === teamId || r.awayTeam.id === teamId)
          );
        })
      : [];
  }
}
