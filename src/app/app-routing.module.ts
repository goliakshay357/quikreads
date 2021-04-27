import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {LoginSignupComponent} from './components/login-signup/login-signup.component';
import {GenreComponent} from './components/genre/genre.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginSignupComponent,
  },
  {
    path: 'genre',
    component: GenreComponent,
  },
  {
    path: 'book',
    component: BookDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
