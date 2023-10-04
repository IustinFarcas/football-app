import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MatchHistoryModel,
  TeamScoreModel,
} from '../models/match-history.model';
import { StandingModel } from '../models/standing.model';

export interface Fixture {
  fixture: {
    timestamp: number;
    // FT - Match Finished
    status: {
      short: string;
    };
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };
}

export interface FixtureResponse {
  errors: { bug: string };
  results: number;
  response: Fixture[];
}

export interface TeamStanding {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
}

export interface League {
  league: {
    id: number;
    season: number;
    standings: TeamStanding[][];
  };
}

export interface StandigsResponse {
  errors: { bug: string };
  results: number;
  response: League[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiKey: string = 'a5e82426e1b657f078bba9ea5aa31c54';
  baseUrl: string = 'https://v3.football.api-sports.io';
  season: number = new Date().getFullYear();
  fixtureStatus: string = 'FT';

  constructor(private http: HttpClient) {}

  getStanding(leagueId: number): Observable<StandingModel[]> {
    return this.http
      .get<StandigsResponse>(
        `${this.baseUrl}/standings?league=${leagueId}&season=${this.season}`,
        {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${this.apiKey}`,
          },
        }
      )
      .pipe(
        map((res) => {
          if (res.errors) throwError(() => new Error(res.errors.bug));
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
        })
      );
  }

  getFinishedMatches(leagueId: number): Observable<MatchHistoryModel[]> {
    return this.http
      .get<FixtureResponse>(
        `${this.baseUrl}/fixtures?league=${leagueId}&season=${this.season}&status=${this.fixtureStatus}`,
        {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${this.apiKey}`,
          },
        }
      )
      .pipe(
        map((res) => {
          if (res.errors) throwError(() => new Error(res.errors.bug));
          let data: MatchHistoryModel[] = [];

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
            const result = new MatchHistoryModel(
              r.fixture.status.short,
              new Date(r.fixture.timestamp),
              homeTeam,
              awayTeam
            );
            data.push(result);
          });
          return data;
        })
      );
  }
}
