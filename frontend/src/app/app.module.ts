import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapPageComponent } from './components/map/map-page/map-page.component';
import { MoviePageComponent } from './components/movie/movie-page/movie-page.component';
import { MovieCreditsComponent } from './components/movie/movie-credits/movie-credits.component';
import { SearchComponent } from './components/search/search.component';
import { TvPageComponent } from './components/tv/tv-page/tv-page.component';
import { TvCreditsComponent } from './components/tv/tv-credits/tv-credits.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MapPageComponent,
    MoviePageComponent,
    MovieCreditsComponent,
    SearchComponent,
    TvPageComponent,
    TvCreditsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
