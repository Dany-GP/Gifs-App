import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(): void {

    if(this.txtBuscar.nativeElement.value.trim().length ==0){
      return;
    }

    this.GifsService.buscarGifs(this.txtBuscar.nativeElement.value);

    console.log(this.txtBuscar.nativeElement.value);

    this.txtBuscar.nativeElement.value = '';

  }

  constructor(private GifsService: GifsService) { }

}
