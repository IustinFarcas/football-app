import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchHistoryModel } from '../models/match-history.model';
import { MatchHistoryService } from '../services/match-history.service';
import { allowedLeagueIds } from '../utils';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css'],
})
export class MatchHistoryComponent implements OnInit {
  teamScores: MatchHistoryModel[] = [];
  leagueId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchHistoryService: MatchHistoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = +params['leagueId'];
      const teamId = +params['teamId'];
      if (this.leagueId && teamId && allowedLeagueIds.includes(this.leagueId)) {
        this.matchHistoryService
          .getTeamResultsHistory(this.leagueId, teamId)
          .then((res) => (this.teamScores = res));
      } else {
        this.router.navigate(['page-not-found']);
      }
    });
  }

  onBackClicked() {
    this.router.navigate([this.leagueId]);
  }
}
