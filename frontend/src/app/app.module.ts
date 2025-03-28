import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapPageComponent } from './components/map/map-page/map-page.component';
import { MovieDetailsComponent } from './components/movie/movie-details/movie-details.component';
import { MovieCreditsComponent } from './components/movie/movie-credits/movie-credits.component';
import { SearchComponent } from './components/search/search.component';
import { TvDetailsComponent } from './components/tv/tv-details/tv-details.component';
import { TvCreditsComponent } from './components/tv/tv-credits/tv-credits.component';
import { PersonDetailsComponent } from './components/person/person-details/person-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MoviePageComponent } from './components/movie/movie-page/movie-page.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { AuthComponent } from './components/auth/auth.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout.component';
import { HomeLayoutComponent } from './components/layouts/home-layout.component';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { AuthGuard } from './guards/auth-guard.guard';
import { ErrorComponent } from './components/error/error.component';
import { UserActivityComponent } from './components/user/user-activity/user-activity.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';
import { UserReviewListComponent } from './components/user/user-review-list/user-review-list.component';
import { MapAddComponent } from './components/map/map-add/map-add.component';
import { MapDetailsComponent } from './components/map/map-details/map-details.component';
import { MapMainComponent } from './components/map/map-main/map-main.component';
import { TvPageComponent } from './components/tv/tv-page/tv-page.component';
import { MapMiniComponent } from './components/map/map-mini/map-mini.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HomeLayoutComponent,
    AuthComponent,
    AuthLayoutComponent,
    MapPageComponent,
    MovieDetailsComponent,
    MovieCreditsComponent,
    SearchComponent,
    TvDetailsComponent,
    TvCreditsComponent,
    PersonDetailsComponent,
    MoviePageComponent,
    ErrorComponent,
    UserActivityComponent,
    UserPageComponent,
    UserReviewListComponent,
    MapAddComponent,
    MapDetailsComponent,
    MapMainComponent,
    TvPageComponent,
    MapMiniComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgxSliderModule
  ],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
