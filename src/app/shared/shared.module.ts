import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppState } from '../app.state';
import { AutenticadorService } from './services/autenticador.service';
import { DaoService } from './services/dao.service';
import { MenuService } from './services/menu.service';
import { MaterialModule } from '../material/material.module';
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
    MenuService
  ]
})
export class SharedModule { }
