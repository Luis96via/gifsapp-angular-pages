import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { debounceTime, distinctUntilChanged, fromEvent, map, filter } from 'rxjs';


@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      #txtTagInput
    >
  `
})

export class SearchBoxComponent implements AfterViewInit {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  ngAfterViewInit() {
    fromEvent(this.tagInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((value: string) => value.length >= 3),
        debounceTime(900),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.gifsService.searchTag(value);
      });
  }
}
