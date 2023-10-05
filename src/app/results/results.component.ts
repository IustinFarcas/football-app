import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { CacheModel } from '../models/cache.model';
import { ResultModel } from '../models/result.model';
import { CacheService } from '../services/cache.service';
import { LoadingService } from '../services/loading.service';
import { ResultsService } from '../services/results.service';
import { allowedLeagueIds, resultsStoreKey } from '../utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results: ResultModel[] = [];
  isLoading: Subject<boolean> = this.loadingService.isLoading;
  leagueId!: number;
  teamId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService,
    private cache: CacheService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.initializeResults(params);
    });
  }

  onBackClicked() {
    this.router.navigate([this.leagueId]);
  }

  private async initializeResults(params: Params) {
    const lId = +params['leagueId'];
    const tId = +params['teamId'];
    if (this.areValidParams(lId, tId)) {
      this.leagueId = lId;
      this.teamId = tId;
      const storekey = resultsStoreKey(this.leagueId);

      if (this.cache.needsRefresh<CacheModel<ResultModel>>(storekey)) {
        this.resultsService.refreshCache(this.leagueId, storekey);
        while (await firstValueFrom(this.isLoading)) {}
      }
      this.results = this.resultsService.getTeamResults(this.teamId, storekey);
    } else {
      this.router.navigate(['page-not-found']);
    }
  }

  private areValidParams(leagueId: unknown, teamId: unknown): boolean {
    return (
      !Number.isNaN(leagueId) &&
      !Number.isNaN(teamId) &&
      Number.isInteger(leagueId) &&
      Number.isInteger(teamId) &&
      allowedLeagueIds.includes(leagueId as number)
    );
  }
}
