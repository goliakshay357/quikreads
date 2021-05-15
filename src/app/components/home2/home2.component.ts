import {Component, OnInit} from '@angular/core';
import {RestApiService} from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {

  constructor(private _rest_api: RestApiService) {
  }

  bookSearch:any = [];
  business_books: any;
  personal_books: any;
  latest_books: any;
  
  ngOnInit(): void {
    this.latestBooksData();
    this.gettingBusinessData();
    this.gettingPersonalData();
    this.fillBookSearch();
  }

  async gettingBusinessData() {
    const response = this._rest_api.categorySpecificLimit('business');
    const data = await response;
    this.business_books = data.content;
    console.log(this.business_books);
  }

  async gettingPersonalData() {
    const response = this._rest_api.categorySpecificLimit('personal');
    const data = await response;
    this.personal_books = data.content;
    console.log(this.business_books);
  }

  async latestBooksData() {
    const response = this._rest_api.latestBooks(12);
    const data = await response;
    this.latest_books = data.content;
    console.log(this.latest_books);
  }

  async fillBookSearch() {
    this.bookSearch = [
      {
        "_id": "609f6dfef5dd26d5669b3a01",
        "isbn_number": 0,
        "book_title": "Sultrax"
      },
      {
        "_id": "609f6dfed1874ee399fe80bb",
        "isbn_number": 1,
        "book_title": "Unisure"
      },
      {
        "_id": "609f6dfe3ddb507d13cc1a00",
        "isbn_number": 2,
        "book_title": "Corecom"
      },
      {
        "_id": "609f6dfeab3e852d8e131ab0",
        "isbn_number": 3,
        "book_title": "Chorizon"
      },
      {
        "_id": "609f6dfe409ea8d6a3e0bc04",
        "isbn_number": 4,
        "book_title": "Netropic"
      }
    ]
  }
}
