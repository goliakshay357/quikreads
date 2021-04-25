import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  latest_books = [
    {},{},{},{}, {}, {},{},{},{}
  ]

  ngOnInit(): void {
    let data:any = $("#light-slider, #personal-slider, #business-slider")
    data.lightSlider({
      autoWidth: true,
      loop:true,
      onSliderLoad: function() {
        $('#light-slider, #personal-slider, #business-slider').removeClass('cs-hidden')
      }
    });
  }

}
