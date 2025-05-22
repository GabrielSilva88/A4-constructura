import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';

const routes: Routes = [
  {path: 'despesa', component: DespesasComponent},
  {path: 'despesa/:id', component: DespesasComponent},
  {path: 'receita', component: ReceitasComponent},
  {path: 'receita/:id', component: ReceitasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
