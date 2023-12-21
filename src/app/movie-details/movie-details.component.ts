import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from '../service/movie-api-service.service';
import {
  Title,
  Meta,
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  recommendedMovies: any;
  constructor(
    private service: MovieApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta
  ) {}
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  relatedMovies: any;
  thumbnailVisible: boolean = true;
  videoVisible: boolean = true;
  playButtonVisible = true;
  autoplayEnabled = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.getMovie(movieId);
        this.getVideo(movieId);
        this.getMovieCast(movieId);
        this.loadRelatedMovies(movieId);
        this.loadRecommendedMovies(movieId);
      }
    });
  }
  // Function to reload the current page
  // Function to reload the current page
  reloadCurrentPage(id: any) {
    this.router
      .navigateByUrl('/movie', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/movie', id]);
      });
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(
        `${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`
      );
      this.meta.updateTag({
        name: 'title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        name: 'description',
        content: this.getMovieDetailResult.overview,
      });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({
        property: 'og:title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.getMovieDetailResult.overview,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`,
      });
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast.slice(0, 6);
    });
  }
  loadRelatedMovies(id: any) {
    this.service.getRelatedMovies(id).subscribe((data) => {
      this.relatedMovies = data.results.slice(0, 4);
    });
  }
  loadRecommendedMovies(id: any) {
    this.service.getRecommendedMovies(id).subscribe((data) => {
      this.recommendedMovies = data.results;
    });
  }

  //Swiper
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

    new Swiper('.mySwiper', {
      effect: 'cards',
      grabCursor: true,
      loop: true,
    });
  }
  generatePageIdentifier(): string {
    // Generate a unique identifier dynamically for each page
    return 'page-' + Date.now();
  }

  getCurrentPageURL(): string {
    // Get the current page URL dynamically
    return window.location.href.replace(/\.html$/, ''); // Removing .html extension from the URL for sync in case of URL rewriting
  }

  // get vidSrcUrl(): string {
  //   // Build the vidsrc URL with the movie ID
  //   return `https://vidsrc.to/embed/movie/${this.getMovieDetailResult.id}`;
  // }

  get vidSrcUrl(): SafeResourceUrl {
    // Build the vidsrc URL with the movie ID and sanitize it
    const url = `https://vidsrc.me/embed/movie?tmdb=${this.getMovieDetailResult.id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //Thumbnail Swicth
  playMovie() {
    this.thumbnailVisible = false;
    this.videoVisible = true;
    this.playButtonVisible = false;
    this.autoplayEnabled = true;
  }
}
