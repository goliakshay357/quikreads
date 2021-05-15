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

  business_books: any;
  personal_books: any;
  latest_books: any;

  ngOnInit(): void {
    this.latestBooksData();
    this.gettingBusinessData();
    this.gettingPersonalData();
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
}
