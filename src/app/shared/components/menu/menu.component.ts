import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MenuTypeEnum } from '../../enums/menu-type.enum';

@Component({
  selector: 'app-menu',
  imports: [MaterialModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  
  constructor(
    private router: Router,
    private menuService: MenuService
  ){}

  get estouDashboard(): boolean{
    return this.menuService.ondeEstou === MenuTypeEnum.DASHBOARD;
  }

  get estouRelatorioReceita(): boolean{
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_RECEITA;
  }

  get estouRelatorioDespesa(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_DESPESA;
  }

  get estouLancamentoReceita(): boolean{
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_RECEITA;
  }

  get estouLancamentoDespesa(): boolean{
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_DESPESA;
  }

  onNavigate(valor: string):void{
    this.router.navigate([valor]);
  }
}
