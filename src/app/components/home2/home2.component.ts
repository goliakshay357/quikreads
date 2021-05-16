import {Component, OnInit} from '@angular/core';
import {RestApiService} from 'src/app/services/rest-api.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {


  // tslint:disable-next-line:variable-name
  constructor(private _rest_api: RestApiService) {
  }

  bookSearch: any = [];
  business_books: any;
  personal_books: any;
  latest_books: any;
  fuse:any;
  bookSearchFuse: any;

  ngOnInit(): void {
    this.latestBooksData();
    this.gettingBusinessData();
    this.gettingPersonalData();
    this.fillBookSearch();
  }

  // tslint:disable-next-line:typedef
  async gettingBusinessData() {
    const response = this._rest_api.categorySpecificLimit('business');
    const data = await response;
    this.business_books = data.content;
    console.log(this.business_books);
  }

  // tslint:disable-next-line:typedef
  async gettingPersonalData() {
    const response = this._rest_api.categorySpecificLimit('personal');
    const data = await response;
    this.personal_books = data.content;
    console.log(this.business_books);
  }

  // tslint:disable-next-line:typedef
  async latestBooksData() {
    const response = this._rest_api.latestBooks(12);
    const data = await response;
    this.latest_books = data.content;
    console.log(this.latest_books);
  }

  // tslint:disable-next-line:typedef
  async fillBookSearch() {
    const response = this._rest_api.getSearchFeed()
    const data = await response;
    this.bookSearch = data.content;
    // ------------------------------------------------------------
    // Fuse JS COnfig
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: [
        'book_title',
      ]
    };
    this.fuse = await new Fuse(this.bookSearch, options);
  }

  // tslint:disable-next-line:typedef
  textInputChange(parameter:any){
    console.log(parameter);
    this.bookSearchFuse =  this.fuse.search(parameter.value);
    console.log(this.bookSearchFuse);
  }
}
