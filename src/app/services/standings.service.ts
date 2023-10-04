import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StandingModel } from '../models/standing.model';
import { StandingsCacheModel } from '../models/standings-cache.model';
import { addHours, leagueIdToLeagueName } from '../utils';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class StandingsService {
  constructor(private api: ApiService, private cache: CacheService) {}

  async getStandings(leagueId: number): Promise<StandingModel[]> {
    const storeKey = leagueIdToLeagueName[leagueId] + ' - Standings';

    const lastCacheUpdate =
      this.cache.readFromCache<StandingsCacheModel>(storeKey)?.lastCacheUpdate;

    const shouldRefreshCache: boolean =
      lastCacheUpdate === undefined ||
      addHours(lastCacheUpdate, 3) < new Date();

    if (shouldRefreshCache) {
      await this.refreshCache(leagueId, storeKey);
    }
    return this.cache.readFromCache<StandingsCacheModel>(storeKey)?.data ?? [];
  }

  private async refreshCache(leagueId: number, key: string): Promise<void> {
    const data = await firstValueFrom(this.api.getStanding(leagueId)).catch(
      (err) => console.log(err)
    );
    if (data) {
      await this.cache.writeToCache(
        new StandingsCacheModel(leagueId, new Date(), data),
        key
      );
    }
  }
}
