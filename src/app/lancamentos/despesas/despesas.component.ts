import { Component } from '@angular/core';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import { MenuService } from '../../shared/services/menu.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-despesas',
  imports: [
    MaterialModule, 
    CommonModule,
    MenuComponent,
    ReactiveFormsModule],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent {
  dataSource: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  formulario!: FormGroup;
  
  constructor(
      private menuService: MenuService
  ) {
      // notificar ao menu em qual componente estou
      this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
    }
}
