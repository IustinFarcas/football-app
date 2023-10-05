import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CountriesHeaderComponent } from './rankings/countries-header/countries-header.component';
import { RankingComponent } from './rankings/ranking/ranking.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ResultsComponent } from './results/results.component';
import { LoadingInterceptor } from './services/interceptors/loading.interceptor';
import { RequestHeaderInterceptor } from './services/interceptors/request-headers.interceptor';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesHeaderComponent,
    RankingComponent,
    WelcomeComponent,
    ResultsComponent,
    PageNotFoundComponent,
    RankingsComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHeaderInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
