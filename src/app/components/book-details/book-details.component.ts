import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  }

}
