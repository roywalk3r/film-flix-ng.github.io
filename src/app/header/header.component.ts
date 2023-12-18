import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from '../service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  renderer: any;
  elementRef: any;
  constructor(
    private service: MovieApiServiceService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('FilmFLix | Home Of Movies ');
    this.meta.updateTag({
      name: 'description',
      content: 'Watch your favourite movies here ',
    });
  }

  showResultsContainer: boolean = false;

  ngOnInit(): void {}

  searchResult: any;
  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  submitForm() {
    console.log(this.searchForm.value, 'searchform#');
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      console.log(result, 'searchmovie##');
      this.searchResult = result.results;
    });
  }

  @Input() showHeader: boolean = true;
}
