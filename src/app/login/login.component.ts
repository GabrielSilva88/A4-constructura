import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AutenticadorService } from '../shared/services/autenticador.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { StateService } from '../shared/services/state.service'
import { HttpStatusCode } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formulario!: FormGroup;
  
    constructor(
      private autenticadorService: AutenticadorService,
      private formBuilder: FormBuilder,
      private router: Router,
      private state : StateService
    ){
      this.iniciarFormulario();
    }
    /**
     * inicia formulario
     */
    private iniciarFormulario(): void {
      this.formulario = this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        senha: ['',[Validators.required, Validators.minLength(3)]]
      });
    }

    /*
      metodo valida usuario autenticar.
    */
    login(): void {
      let login = this.formulario.value;
      this.autenticadorService.login(login).subscribe({
          next: (resp) => {
            if(resp.status === HttpStatusCode.Created){
              this.state.token = resp.headers.get('authorization') || '';
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            Swal.fire({
              title: "Acesso Negado",
              text: err.error.mensagem,
              icon: "error"
            });
          }
        });      
        console.log('fim do metodo')
    }

    onLogon(): void{
      this.login();
    }
}
