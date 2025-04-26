import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    DaoService,
    AutenticadorService
  ]
})
export class SharedModule { }
