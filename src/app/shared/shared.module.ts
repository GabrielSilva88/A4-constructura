import { CommonModule, registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppState } from '../app.state';
import { AutenticadorService } from './services/autenticador.service';
import { DaoService } from './services/dao.service';
import { MenuService } from './services/menu.service';
import { MaterialModule } from '../material/material.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    
],
  imports: [
    CommonModule,
    MaterialModule
],
  exports:[
],
  providers:[
    AppState,
    DaoService,
    AutenticadorService,
    MenuService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Define o locale padrão como pt-BR
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' } // Define o código da moeda padrão como BRL
  ]
})
export class SharedModule { }
