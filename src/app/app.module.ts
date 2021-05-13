import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/homealone/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { GenreComponent } from './components/genre/genre.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { Home2Component } from './components/home2/home2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginSignupComponent,
    GenreComponent,
    BookDetailsComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
