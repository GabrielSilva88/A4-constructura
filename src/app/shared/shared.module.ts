import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppState } from '../app.state';
import { AutenticadorService } from './services/autenticador.service';
import { DaoService } from './services/dao.service';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  
],
  exports:[
],
  providers:[
    AppState,
    DaoService,
    AutenticadorService
  ]
})
export class SharedModule { }
