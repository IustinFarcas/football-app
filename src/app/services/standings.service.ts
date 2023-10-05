import { Injectable } from '@angular/core';
import { CacheModel } from '../models/cache.model';
import { StandingModel } from '../models/standing.model';
import { standingsStoreKey } from '../utils';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class StandingsService {
  constructor(private api: ApiService, private cache: CacheService) {}

  getStandings(leagueId: number): StandingModel[] {
    return (
      this.cache.readFromCache<CacheModel<StandingModel>>(
        standingsStoreKey(leagueId)
      )?.data ?? []
    );
  }

  refreshCache(leagueId: number, key: string): void {
    let standings: StandingModel[];
    this.api.getStanding(leagueId).subscribe({
      next: (res) => {
        standings = [] as StandingModel[];
        standings.push(...res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.cache.writeToCache(
          new CacheModel<StandingModel>(leagueId, new Date(), standings),
          key
        );
      },
    });
  }
}
