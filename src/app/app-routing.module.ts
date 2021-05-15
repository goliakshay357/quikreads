import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home2Component } from './components/home2/home2.component';
import {LoginSignupComponent} from './components/login-signup/login-signup.component';
import {GenreComponent} from './components/genre/genre.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home2Component,
  },

  {
    path: 'login',
    component: LoginSignupComponent,
  },
  {
    path: 'genre/:genre',
    component: GenreComponent,
  },
  {
    path: 'book/:isbn',
    component: BookDetailsComponent,
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
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
