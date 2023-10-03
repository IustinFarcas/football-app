import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CountriesHeaderComponent } from './rankings/countries-header/countries-header.component';
import { RankingComponent } from './rankings/ranking/ranking.component';
import { RankingsComponent } from './rankings/rankings.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesHeaderComponent,
    RankingComponent,
    WelcomeComponent,
    MatchHistoryComponent,
    PageNotFoundComponent,
    RankingsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
