import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'czbBX7XoVkJx7a8eKU0MSYcdKbLXn0Fs';
  private _historial: string[] = [];

  //TODO: Cambiar any por sy tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

    /* Esta es una manera de hacerlo igual a la de arriba
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! )
    }*/

  }

  buscarGifs(query: string ){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=czbBX7XoVkJx7a8eKU0MSYcdKbLXn0Fs&q=${query}&limit=10`)
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
      
    })
    
  }
  
}
