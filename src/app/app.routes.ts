import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DespesasComponent } from './ralatorios/despesas/despesas.component';
import { ReceitasComponent } from './ralatorios/receitas/receitas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'relatorios/despesas', component: DespesasComponent},
    { path: 'relatorios/receitas', component: ReceitasComponent},
    { path: 'lancamentos', loadChildren: () => 
        import('./lancamentos/lancamentos.module').then(m=> m.LancamentosModule)},
    
    { path: '**', component: PageNotFoundComponent },
];
