import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import { MenuService } from '../../shared/services/menu.service';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { LogoutComponent } from '../../shared/components/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-receitas',
  imports: [
    MaterialModule, 
    CommonModule,
    MenuComponent, 
    LogoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent {
  dataSource: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  constructor(
    private menuService: MenuService
  ) {
    // notificar ao menu em qual componente estou
    this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_RECEITA;
   }
}
