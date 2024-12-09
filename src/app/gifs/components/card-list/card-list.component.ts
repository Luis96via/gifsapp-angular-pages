import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent{
  @Input() set gifs(value: Gif[]) {
    this._gifs = value;
    // Reiniciar estados de carga cuando cambian los gifs
    value.forEach(gif => {
      this.loadingStates[gif.id] = true;
    });
  }
  
  get gifs(): Gif[] {
    return this._gifs;
  }

  private _gifs: Gif[] = [];
  public loadingStates: { [key: string]: boolean } = {};

  onImageLoad(gifId: string) {
    this.loadingStates[gifId] = false;
  }
}