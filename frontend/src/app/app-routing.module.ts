import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviePageComponent } from './components/movie/movie-page/movie-page.component';
import { MovieCreditsComponent } from './components/movie/movie-credits/movie-credits.component';
import { movieDetailsResolver } from './services/movie/movie-details.service';
import { movieCreditsResolver, movieCreditsResolverShort } from './services/movie/movie-credits.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MoviePageComponent, resolve: {
    details: movieDetailsResolver,
    credits: movieCreditsResolverShort
    }
  },
  { path: 'movie/:id/credits', component: MovieCreditsComponent, resolve: {
    credits: movieCreditsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
