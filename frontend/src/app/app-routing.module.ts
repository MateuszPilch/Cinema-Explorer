import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviePageComponent } from './components/movie/movie-page/movie-page.component';
import { MovieCreditsComponent } from './components/movie/movie-credits/movie-credits.component';
import { movieDetailsResolver } from './services/movie/movie-details.service';
import { movieCreditsResolver, movieCreditsResolverShort } from './services/movie/movie-credits.service';
import { TvPageComponent } from './components/tv/tv-page/tv-page.component';
import { TvCreditsComponent } from './components/tv/tv-credits/tv-credits.component';
import { tvDetailsResolver } from './services/tv/tv-details.service';
import { tvCreditsResolver, tvCreditsResolverShort } from './services/tv/tv-credits.service';
import { SearchComponent } from './components/search/search.component';
import { searchResolver } from './services/search/search.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent, resolve: {
      data: searchResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  { path: 'movie/:id', component: MoviePageComponent, resolve: {
      details: movieDetailsResolver,
      credits: movieCreditsResolverShort
    }
  },
  { path: 'movie/:id/credits', component: MovieCreditsComponent, resolve: {
    details: movieDetailsResolver,
      credits: movieCreditsResolver
    }
  },
  {
    path: 'tv/:id', component: TvPageComponent, resolve: {
      details: tvDetailsResolver,
      credits: tvCreditsResolverShort
    }
  },
  { path: 'tv/:id/credits', component: TvCreditsComponent, resolve: {
    details: tvDetailsResolver,
    credits: tvCreditsResolver
    }
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
