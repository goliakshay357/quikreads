import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  latest_books = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}
  ];

  ngOnInit(): void {
    // const data: any = $('#light-slider, #personal-slider, #business-slider');
    // data.lightSlider({
    //   autoWidth: true,
    //   loop: true,
    //   // tslint:disable-next-line:typedef
    //   onSliderLoad() {
    //     $('#light-slider, #personal-slider, #business-slider').removeClass('cs-hidden');
    //   }
    // });
  }

}
