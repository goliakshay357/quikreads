import { Component, OnInit } from '@angular/core';
import { Data, Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
declare var $: any;
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  activateID: any;
  bookDetails: any;
  youtubeLinks:any = [];
  bookQuotes: any;
  
  convertVideoLink = () => {
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    console.log(this.bookDetails);
    for ( let i = 0; i < this.bookDetails.youtube_links.length; i++) {
      let url = this.bookDetails.youtube_links[i];
      url = url.match(VID_REGEX)[1];
      this.bookDetails.youtube_links[i] = 'https://www.youtube.com/embed/' + url;
      console.log(this.bookDetails.youtube_links[i]);
    }
  }
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _rest_api: RestApiService) {
    this.activatedRoute.params.subscribe(params => this.activateID = params);
    console.log(this.activateID.isbn);
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
    this.gettingBookDataISBN();

    // -------------------------------------------------------------------------
    const downloadButton = document.getElementById('download');
    const buyButton = document.getElementById('buy');
    // -----------------------------
  }

  onDownload = () => {
    window.open(this.bookDetails.download_links[0]);
  };
  
  onBuy = () => {
    window.open(this.bookDetails.amazon_purchase);
  };

  async gettingBookDataISBN(){
    const response = this._rest_api.getBookByISBN(this.activateID.isbn);
    const data = await response;
    this.bookDetails = data.content[0];
    await this.convertVideoLink();
    this.youtubeEmbed(this.bookDetails.youtube_links)
    this.bookQuotes = this.bookDetails.book_quote

    if(this.bookDetails.podcast_mp3[0]){
      console.log(this.bookDetails.podcast_mp3[0])
      let data:any = document.getElementById('spotify')
      // data.src = this.bookDetails.podcast_mp3[0]
    }
  }

  data=(link:any)=> `<iframe width="100%" height="500" src="${link}" title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>`

  youtubeEmbed(parameter:any){
    let length = parameter.length
    for(let i=0; i<length; i++){
      // console.log(parameter[i],"dd")
      $(`#slider`).append(this.data(parameter[i]))
    }
  }

  shareLink(){
    console.log("copy");
    
    $("body").append('<input id="copyURL" type="text" value="" />');
    $("#copyURL").val(window.location.href).select();
    document.execCommand("copy");
    $("#copyURL").remove();   
  }
}
