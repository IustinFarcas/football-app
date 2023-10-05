import { Injectable } from '@angular/core';
import { CacheModel } from '../models/cache.model';
import { ResultModel } from '../models/result.model';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class ResultsService {
  constructor(private api: ApiService, private cache: CacheService) {}

  refreshCache(leagueId: number, key: string): void {
    let results: ResultModel[];
    this.api.getFinishedMatches(leagueId).subscribe({
      next: (res) => {
        results = [] as ResultModel[];
        results.push(...res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.cache.writeToCache(
          new CacheModel<ResultModel>(leagueId, new Date(), results),
          key
        );
      },
    });
  }

  getTeamResults(teamId: number, key: string): ResultModel[] {
    const data = this.cache.readFromCache<CacheModel<ResultModel>>(key)?.data;
    return data
      ? data
          .filter((r) => {
            return r.homeTeam.id === teamId || r.awayTeam.id === teamId;
          })
          .sort((d1, d2) => {
            const t1 = new Date(d1.eventDate).getTime();
            const t2 = new Date(d2.eventDate).getTime();
            return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
          })
          .slice(-10)
      : [];
  }
}
