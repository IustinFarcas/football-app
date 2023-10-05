import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RankingComponent } from './rankings/ranking/ranking.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ResultsComponent } from './results/results.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: '',
    component: RankingsComponent,
    children: [
      { path: '', component: WelcomeComponent },
      {
        path: ':leagueId',
        component: RankingComponent,
      },
    ],
  },
  { path: ':leagueId/:teamId', component: ResultsComponent },

  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
