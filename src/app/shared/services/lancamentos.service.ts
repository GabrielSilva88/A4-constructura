import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { OperacaoTypeEnum } from '../enums/operacao-type.enum';
import { Lancamento } from '../models/lancamento';
import { IDespesa } from '../models/despesa.interface';
import { IReceita } from '../models/receita.interface';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  chaveStorage = 'selecionado';

  constructor(
    private daoService: DaoService
  ) { }

  get modoEdicao(): boolean{
    return (sessionStorage.getItem('modoEdicao') === OperacaoTypeEnum.EDITAR);
  }

  set modoEdicao(ehEdicao: boolean){
    if(ehEdicao){
      sessionStorage.setItem('modoEdicao', OperacaoTypeEnum.EDITAR);
    }else{
      sessionStorage.setItem('modoEdicao', OperacaoTypeEnum.SALVAR);
    }
  }

  gravaLancamentoSelecionado(lancamento: Lancamento): void{
    if (lancamento) {
      const lancamentoString = JSON.stringify(lancamento);
      sessionStorage.setItem(this.chaveStorage,lancamentoString);
    }
  }

  recuperarLancamentoSelecionado(): Lancamento {
    const lancamentoString = sessionStorage.getItem(this.chaveStorage);
    if (!lancamentoString) {
      return null as unknown as Lancamento;
    }
    const recuperado = JSON.parse(lancamentoString);
    return recuperado as unknown as Lancamento; // error ao inserir sem 'as unknown'
  }

  private lancamentoToDespesa(lancamento: Lancamento): IDespesa | IReceita{
    return{
      id: lancamento.id,
      data: lancamento.data,
      descricao: lancamento.descricao,
      ehFixo: lancamento.ehFixo,
      tipo: lancamento.tipo,
      valor: lancamento.valor
    }
  }

  private lancamentoToReceita(lancamento: IReceita): IReceita {
    return {
      id: lancamento.id,
      data: lancamento.data,
      descricao: lancamento.descricao,
      ehFixo: lancamento.ehFixo,
      tipo: lancamento.tipo,
      valor: lancamento.valor
    }
  }

  extractTypeLancamento(lancamento: Lancamento): IDespesa | IReceita{
    if (lancamento.ehReceita) {
      return this.lancamentoToReceita(lancamento);
    } else {
      return this.lancamentoToDespesa(lancamento);
    }
  }

  /*
    converter receita para lancamento
  */ 
  receitaToLancamento(objeto: IReceita): Lancamento{
    return new Lancamento(objeto, true);
  }

  
  /**
   *    converter despesa para lancamento
   * @param objeto 
   * @returns 
   */ 
  despesaToLancamento(objeto: IDespesa): Lancamento {
    return new Lancamento(objeto, false);
  }

  /**
   * lista lançamentos que existe
   * @returns lista atualizada.
   */
  listarLancamentos(): Observable<HttpResponse<Lancamento[]>> {
    return this.daoService.get<Lancamento[]>(AppSettings.LANCAMENTO_URL, DaoService.MEDIA_TYPE_APP_JSON)
  }
/**
 * Criar um novo lancamento
 * @param lancamento 
 * @returns 
 */
  criarLancamento(lancamento: Lancamento): Observable<HttpResponse<Lancamento>>{
    return this.daoService.post<Lancamento>(AppSettings.LANCAMENTO_URL,lancamento,DaoService.MEDIA_TYPE_APP_JSON)
  }

  /**
   * atuliazar lançamento
   */
  atualizarLancamento(lancamento: Lancamento): Observable<HttpResponse<Lancamento>> {
    return this.daoService.put<Lancamento>(`${AppSettings.LANCAMENTO_URL}/${lancamento.id}`,lancamento, DaoService.MEDIA_TYPE_APP_JSON)
  }

  /**
   * recupera os dados de um lancamento.
   * @param id 
   * @returns 
   */
  obterLancamento(id:number): Observable<HttpResponse<Lancamento>>{
    return this.daoService.get<Lancamento>(`${AppSettings.LANCAMENTO_URL}/${id}`,DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * remove lancamento da base
   * @param id 
   * @returns 
   */
  removerLancamento(id: number): Observable<HttpResponse<Lancamento>>{
    return this.daoService.delete<Lancamento>(`${AppSettings.LANCAMENTO_URL}/${id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
}
