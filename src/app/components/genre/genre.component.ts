import { Component, OnInit } from '@angular/core';
import { Data, Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _rest_api: RestApiService) { 
    this.activatedRoute.params.subscribe(params => this.activateID = params);
    console.log(this.activateID.genre)
  }

  activateID:any;
  genre_books:any;
  latestBoolean: boolean = false;

  ngOnInit(): void {
    if(this.activateID.genre === "latest"){
      this.latestBoolean = true
      this.getLatestGenre()
    }else{
      this.gettingGenreData();
    }
  }
  async getLatestGenre(){
    const response = this._rest_api.latestBooks(50);
    const data = await response;
    this.genre_books = data.content;
    console.log(this.genre_books);
  }
  async gettingGenreData(){
    const response = this._rest_api.getGenreBooks(this.activateID.genre)
    const data = await response;
    this.genre_books = data.content;
    console.log(this.genre_books)
  }
} 
