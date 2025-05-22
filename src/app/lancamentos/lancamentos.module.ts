import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { DespesasComponent } from './despesas/despesas.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LancamentosRoutingModule
  ]
})
export class LancamentosModule { }
