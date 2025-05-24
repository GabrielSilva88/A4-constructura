import { Component } from '@angular/core';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { MenuService } from '../shared/services/menu.service';
import { MaterialModule } from '../material/material.module';
import { IReceita } from '../shared/models/receita.interface';
import { IDespesa } from '../shared/models/despesa.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { LogoutComponent } from '../shared/components/logout/logout.component';
import { LancamentosService } from '../shared/services/lancamentos.service';
import { Lancamento } from '../shared/models/lancamento';
import { HttpStatusCode } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [
    MaterialModule,
    CommonModule,
    MenuComponent,
    LogoutComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dataSourceDespesas: Lancamento[] = [];
  dataSourceReceitas: Lancamento[] = [];
  displayedColumns = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];

  constructor(
    private menuService: MenuService,
    private lancamentosService: LancamentosService,
    private router: Router
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
    this.listarLancamentos();
  }

  listarLancamentos(): void {
    this.lancamentosService.listarLancamentos().subscribe({
      next: (value) => {
        const lista = value.body;
        this.dataSourceReceitas = lista?.filter((lanc) => lanc.ehReceita === true) || [];
        this.dataSourceDespesas = lista?.filter((lanc) => lanc.ehReceita === false) || [];
      },
      error: () => {
        this.dataSourceDespesas = [];
        this.dataSourceReceitas = [];
      }
    });
  }

  private removerDespesa(id: number): void {
    this.lancamentosService.removerLancamento(id).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          Swal.fire(
            'SUCESSO: Remover Despesa',
            'Despesa removida com sucesso',
            'success'
          )
          this.listarLancamentos();
        }
      },
      error: (err) => {
        Swal.fire(
          'ALERTA: Remover Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorrer um erro inesperado. [' + err.error.error + ']',
          'warning'
        )
      }
    });
  }

  onDeleteDespesa(despesa: IDespesa): void {
    if (despesa) {
      Swal.fire({
        title: 'Remover Despesa',
        text: `Deseja remover a despesa '${despesa.descricao.toUpperCase()}' ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          const id = despesa.id ? despesa.id : 0;
          this.removerDespesa(id);
        }
      });
    }
  }

  onEditDespesa(despesa: IDespesa): void {
    if (despesa) {
      this.lancamentosService.modoEdicao = true;
      this.lancamentosService.gravaLancamentoSelecionado(new Lancamento(despesa, false));
      this.router.navigate(['lancamentos/despesa/' + despesa.id]);
    }
  }

  private removerReceita(id: number): void {
    this.lancamentosService.removerLancamento(id).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          Swal.fire(
            'SUCESSO: Remover Receita',
            'Receita removida com sucesso',
            'success'
          )
          this.listarLancamentos();
        }
      },
      error: (err) => {
        Swal.fire(
          'ALERTA: Remover Receita',
          err.error.mensagem ? err.error.mensagem : 'Ocorrer um erro inesperado. [' + err.error.error + ']',
          'warning'
        )
      }
    });
  }
  onDeleteReceita(receita: IReceita): void {
    if (receita) {
      Swal.fire({
        title: 'Remover Receita',
        text: `Deseja remover a receita '${receita.descricao.toUpperCase()}' ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          const id = receita.id ? receita.id : 0;
          this.removerReceita(id);
        }
      });
    }
  }

  onEditReceita(receita: IReceita): void {
    if (receita) {
      this.lancamentosService.modoEdicao = true;
      this.lancamentosService.gravaLancamentoSelecionado(new Lancamento(receita, true));
      this.router.navigate(['lancamentos/receita/' + receita.id]);
    }
  }
}

