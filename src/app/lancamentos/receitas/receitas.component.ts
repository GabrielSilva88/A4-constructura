import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { LogoutComponent } from '../../shared/components/logout/logout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaiusculoDirective } from '../../shared/directives/maiusculo.directive';
import { DinheiroDirective } from '../../shared/directives/dinheiro.directive';
import { SharedModule } from '../../shared/shared.module';
import { Subscription } from 'rxjs';
import { MenuService } from '../../shared/services/menu.service';

import { LancamentosService } from '../../shared/services/lancamentos.service';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import moment from 'moment';
import { IReceita } from '../../shared/models/receita.interface';
import { padLeft } from '../../shared/functions/pad-left.function';
import { Lancamento } from '../../shared/models/lancamento';
import Swal from 'sweetalert2';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receitas',
  imports: [
    MenuComponent,
    LogoutComponent,
    MaterialModule,
    ReactiveFormsModule,
    DinheiroDirective,
    MaiusculoDirective,
    CommonModule,
    SharedModule
  ],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})

export class ReceitasComponent {
  private idEdicao = 0;

  private dataSubscription: Subscription | undefined;

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private lancamentosService: LancamentosService,
    private activeRouter: ActivatedRoute
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.LANCAMENTO_RECEITA;
    this.inciarFormulario();

    const id = this.activeRouter.snapshot.params['id'];
    if (id) {
      this.idEdicao = id;
      this.verificarModoEdicao();
    } else {
      this.lancamentosService.modoEdicao=false;
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  get buttonLabel(): string {
    return this.lancamentosService.modoEdicao ? 'Editar' : 'Salvar';
  }

  get tipos(): string[] {
    return ['Pagamentos', 'Salario', 'baneficios'];
  }

  /**
   *  inicia uma formulario 
   */
  private inciarFormulario(): void {
    const hoje = moment().format();
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      data: hoje,
      ehFixo: false,
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    })
  }

  /**
   * 
   * @param receita 
   */
  private carregarFormulario(receita: Lancamento): void {
    if (receita) {
      const valor = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(receita.valor);
      this.formulario.patchValue({
        tipo: receita.tipo,
        data: receita.data,
        ehFixo: receita.ehFixo,
        descricao: receita.descricao,
        valor: receita.valor
      });
    }
  }

  private verificarModoEdicao(): void {
    if (this.lancamentosService.modoEdicao) {
      this.carregarFormulario(this.lancamentosService.recuperarLancamentoSelecionado());
    }
  }

  private salvar(receita: IReceita): void {
    this.lancamentosService.criarLancamento(new Lancamento(receita, true)).subscribe({
      next: (response) => {
        const lancamentoGravado = response.body;
        Swal.fire({
          title: "SUCESSO: Criar Receita",
          text: "Receita criada com sucesso. Código: " + lancamentoGravado?.id,
          icon: "success"
        });
        this.onLimpar();
      },
      error: (err: HttpErrorResponse) => {
        let msg = err.error.error;
        if (err.status === HttpStatusCode.BadRequest && msg?.includes('Bad Request')) {
          msg = 'Usuário não autenticado';
        }
        Swal.fire({
          title: "ALERTA: Criar Despesa",
          text: err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [' + msg + ']',
          icon: "warning"
        });
      }
    });
  }

  private atualizar(receita: IReceita): void {
    receita.id = +this.idEdicao;

    this.lancamentosService.atualizarLancamento(new Lancamento(receita, false)).subscribe({
      next: (response) => {
        const lancamentoGravado = response.body;
        Swal.fire({
          title: "SUCESSO: Editar Despesa",
          text: "Despesa criada com sucesso. Código: " + lancamentoGravado?.id,
          icon: "success"
        });
        this.onLimpar();
      },
      error: (err: HttpErrorResponse) => {
        let msg = err.error.error;
        if (err.status === HttpStatusCode.BadRequest && msg?.includes('Bad Request')) {
          msg = 'Usuário não autenticado';
        }
        Swal.fire({
          title: "ALERTA: Editar Despesa",
          text: err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperadao. [' + msg + ']',
          icon: "warning"
        });
      }
    });
  }



  /**
 * 
 */
  public onSalvar(): void {
    const receitas: IReceita = this.formulario.value;
    receitas.valor = +(receitas.valor.toString().replace('.', '').replace(',', ''));
    receitas.valor = +padLeft(receitas.valor.toString(), 9, '0').replace(/(\d{7})(\d{2})/g, "\$1.\$2");
    receitas.data = moment(receitas.data).format('YYYY-MM-DD');

    if (this.lancamentosService.modoEdicao) {
      this.atualizar(receitas);
    } else {
      this.salvar(receitas);
    }
  }

  public onLimpar(): void {
    this.formulario.reset();
    this.formulario.patchValue({
      data: moment().format(),
      ehFixo: false
    });
  }



}

