import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FixtureResponse } from '../interfaces/fixture-response.interface';
import { StandigsResponse } from '../interfaces/standigs-response.interface';
import { ResultModel } from '../models/result.model';
import { StandingModel } from '../models/standing.model';
import { TeamScoreModel } from '../models/team-score.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl: string = 'https://v3.football.api-sports.io';
  season: number = new Date().getFullYear();
  matchFinishedStatus: string = 'FT';

  constructor(private http: HttpClient) {}

  getStanding(leagueId: number): Observable<StandingModel[]> {
    return this.http
      .get<StandigsResponse>(
        `${this.baseUrl}/standings?league=${leagueId}&season=${this.season}`
      )
      .pipe(
        map((res) => {
          if (!(res.errors instanceof Array))
            throw new ErrorEvent('Error', {
              message: Object.values(res.errors)[0],
            });

          let standings: StandingModel[] = [];

          res.response[0].league.standings[0].map((s) => {
            standings.push(
              new StandingModel(
                s.team.id,
                s.rank,
                s.team.name,
                s.team.logo,
                s.all.played,
                s.points,
                s.goalsDiff,
                s.all.win,
                s.all.draw,
                s.all.lose
              )
            );
          });
          return standings;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getFinishedMatches(leagueId: number): Observable<ResultModel[]> {
    return this.http
      .get<FixtureResponse>(
        `${this.baseUrl}/fixtures?league=${leagueId}&season=${this.season}&status=${this.matchFinishedStatus}`
      )
      .pipe(
        map((res) => {
          if (!(res.errors instanceof Array))
            throw new ErrorEvent('Error', {
              message: Object.values(res.errors)[0],
            });

          let data: ResultModel[] = [];

          res.response.map((r) => {
            const homeTeam = new TeamScoreModel(
              r.teams.home.id,
              r.teams.home.name,
              r.teams.home.logo,
              r.goals.home
            );
            const awayTeam = new TeamScoreModel(
              r.teams.away.id,
              r.teams.away.name,
              r.teams.away.logo,
              r.goals.away
            );
            const result = new ResultModel(
              r.fixture.status.short,
              new Date(r.fixture.timestamp),
              homeTeam,
              awayTeam
            );
            data.push(result);
          });
          return data;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
