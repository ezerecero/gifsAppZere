import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //Operador NotNull asertion ! que le dice a angular que nosotros tenemos la segurodad de que esto nunca será nulo

  constructor(private gifsService: GifsService) {}

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
