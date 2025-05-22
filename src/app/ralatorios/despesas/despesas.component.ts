import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { LogoutComponent } from '../../shared/components/logout/logout.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-despesas',
  imports: [
    MaterialModule,
    CommonModule,
    MenuComponent, 
    LogoutComponent,
    ReactiveFormsModule
  ],
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

    onPequisar(): void{

    }

    get valorTotal(): number{
      return 0;
    }
}
