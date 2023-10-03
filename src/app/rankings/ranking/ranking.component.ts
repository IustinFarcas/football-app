import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { allowedLeagueIds } from 'src/app/utils';
import { StandingModel } from '../../models/standing.model';
import { StandingsService } from '../../services/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  leagueId!: number;
  standings: StandingModel[] = [];

  constructor(
    private standingsService: StandingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = +params['leagueId'];
      if (this.leagueId && allowedLeagueIds.includes(this.leagueId)) {
        this.standingsService.getStandings(this.leagueId).then((res) => {
          this.standings = res;
        });
      } else {
        this.router.navigate(['page-not-found']);
      }
    });
  }

  onTeamStandingClicked(standing: StandingModel) {
    this.router.navigate([this.leagueId, standing.teamId]);
  }
}
