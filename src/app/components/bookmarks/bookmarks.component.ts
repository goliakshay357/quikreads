import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks:any;
  constructor() { }

  ngOnInit(): void {
    let data:any = localStorage.getItem('bookmarks');
    this.bookmarks= JSON.parse(data)
  }

}
