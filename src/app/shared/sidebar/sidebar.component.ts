import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(): string[]{
    return this.GifsService.historial;
  }

  buscar(termino: string){
    console.log(termino);
    this.GifsService.buscarGifs(termino);
  }

  eliminarEtiqueta(index: number){
    this.GifsService.eliminarHistorialPorId(index);
  }

  constructor(private GifsService: GifsService) {
    
   }



}
