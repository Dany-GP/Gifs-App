import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'DZLfGy97pN64k0NzXyAYogty3Z0Caguw';
  private servicioAPI = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];
  private _historial: string[] = [];


  get historial() {
    return [...this._historial];
  }

  eliminarHistorial() {
    localStorage.removeItem('historial');
    this._historial = [];
  }

  eliminarHistorialPorId(posicion: number) {

    this._historial.splice(posicion, 1);
    localStorage.removeItem('historial');
    localStorage.setItem('historial', JSON.stringify(this._historial));

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));


      console.log(this._historial);
    }

    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '99');

    this.http.get<SearchGIFResponse>(`${this.servicioAPI}/search`, {params})
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        console.log(response.data);
      })

  }

  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }
}
