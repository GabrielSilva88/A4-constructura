import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DaoService } from './services/dao.service';

export const declrationss = [
  //  DinheiroDirective,
  //    MaiusculoDirective,
  //    MenuTypeEnum,
  //   OperacaoTypeEnum
  ]

@NgModule({
   declarations: [
    declrationss
  ],
  imports: [
    CommonModule
  ],
  exports:[
    declrationss
  ],
  providers:[
    DaoService
  ]
})
export class SharedModule { }
