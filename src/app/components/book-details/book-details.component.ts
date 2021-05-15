import { Component, OnInit } from '@angular/core';
import { Data, Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  
  activateID:any;
  book_details:any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _rest_api: RestApiService) { 
    this.activatedRoute.params.subscribe(params => this.activateID = params);
    console.log(this.activateID.isbn)
  }

  
  ngOnInit(): void {
    // ------------------------------------------------------------------------
    const nextEl = document.getElementById('next');
    const previousEl = document.getElementById('previous');
    const sliderEl = document.getElementById('slider');
    // @ts-ignore
    nextEl.addEventListener('click', onNextClick);
    // @ts-ignore
    previousEl.addEventListener('click', onPreviousClick);

    // tslint:disable-next-line:typedef
    function onNextClick() {
      // @ts-ignore
      const imgWidth = sliderEl.offsetWidth;
      // @ts-ignore
      sliderEl.scrollLeft += imgWidth;
    }
    // tslint:disable-next-line:typedef
    function onPreviousClick() {
      // @ts-ignore
      const imgWidth = sliderEl.offsetWidth;
      // @ts-ignore
      sliderEl.scrollLeft -= imgWidth;
    }

    // -------------------------------------------------------------------------
    this.gettingBookDataISBN()
  }

  async gettingBookDataISBN(){
    const response = this._rest_api.getBookByISBN(this.activateID.isbn)
    const data = await response;
    this.book_details = data.content[0];
    console.log(this.book_details)
  }
}
