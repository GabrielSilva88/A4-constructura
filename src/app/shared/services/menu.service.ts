import { Injectable } from '@angular/core';
import { MenuTypeEnum } from '../enums/menu-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private paginaAtual = MenuTypeEnum.DASHBOARD;
  constructor() { }

  get ondeEstou(): String {
      return this.paginaAtual;
  }

  set ondeEstou(valor:MenuTypeEnum){
    this.paginaAtual = valor;
  }
}
// implementando os metodos get e set metodo com comportamento de atributo.