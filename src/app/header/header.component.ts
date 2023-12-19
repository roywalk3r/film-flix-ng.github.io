import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from '../service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('resultsContainer')
  resultsContainer!: ElementRef;

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

      // Show the results container only if there are search results
      this.showResultsContainer =
        this.searchResult && this.searchResult.length > 0;
    });
  }

  // Close the search container when the user clicks outside
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (
      this.resultsContainer &&
      !this.resultsContainer.nativeElement.contains(event.target)
    ) {
      // Clicked outside the container
      this.closeSearchContainer();
    }
  }

  closeSearchContainer() {
    // Check if the container is currently visible
    const containerVisible =
      this.resultsContainer.nativeElement.style.display !== 'none';

    if (containerVisible) {
      // Implement the logic to close the container
      console.log('Closing search container...');
      // Use Angular binding to hide the container
      this.showResultsContainer = false;
    }
  }

  @Input() showHeader: boolean = true;
}
