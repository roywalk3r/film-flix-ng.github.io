import { Component, AfterViewInit, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { MovieApiServiceService } from '../service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
// declare let Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnInit {
  constructor(
    private service: MovieApiServiceService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({
      name: 'description',
      content: 'watch online movies',
    });
  }

  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  popularMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
    this.popularData();
  }

  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }

  popularData() {
    this.service.fetchPopularMovies().subscribe((result) => {
      console.log(result, 'popularresult#');

      this.popularMovieResult = result.results;
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
      // this.trendingMovieResult
    });
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }

  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }

  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }

  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

  isVideoVisible = false;

  playVideo(): void {
    this.isVideoVisible = true;

    // Auto play when clicked on the button
    const myvideo = document.querySelector('#myvideo') as HTMLVideoElement;
    myvideo.play();
  }

  closeVideo(): void {
    this.isVideoVisible = false;

    // Pause on close video
    const myvideo = document.querySelector('#myvideo') as HTMLVideoElement;
    myvideo.pause();
  }

  //swiper
  ngAfterViewInit() {
    new Swiper('.popular-content', {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 10,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        510: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        758: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }
}
