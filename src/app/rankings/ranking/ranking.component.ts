import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { CacheModel } from 'src/app/models/cache.model';
import { CacheService } from 'src/app/services/cache.service';
import { LoadingService } from 'src/app/services/loading.service';
import { allowedLeagueIds, standingsStoreKey } from 'src/app/utils';
import { StandingModel } from '../../models/standing.model';
import { StandingsService } from '../../services/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  leagueId!: number;
  isLoading: Subject<boolean> = this.loadingService.isLoading;
  standings: StandingModel[] = [];

  constructor(
    private loadingService: LoadingService,
    private cache: CacheService,
    private standingsService: StandingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.initializeStandings(params);
    });
  }

  onTeamStandingClicked(standing: StandingModel) {
    this.router.navigate([this.leagueId, standing.teamId]);
  }

  private async initializeStandings(params: Params) {
    const id = +params['leagueId'];
    if (this.isValidParam(id)) {
      this.leagueId = id;
      const key: string = standingsStoreKey(this.leagueId);

      if (this.cache.needsRefresh(key)) {
        this.standingsService.refreshCache(this.leagueId, key);
        while (await firstValueFrom(this.isLoading)) {}
      }

      this.standings =
        this.cache.readFromCache<CacheModel<StandingModel>>(key)?.data ?? [];
    } else {
      this.router.navigate(['page-not-found']);
    }
  }

  private isValidParam(param: unknown) {
    return (
      !Number.isNaN(param) &&
      Number.isInteger(param) &&
      allowedLeagueIds.includes(param as number)
    );
  }
}
