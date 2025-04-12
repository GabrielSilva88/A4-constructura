import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
// lib
import Swal from "sweetalert2";
import { UsuarioService } from "../services/usuario.service";
// service


@Injectable()
export class AutenticadorGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    if (this.usuarioService.usuarioLogado) {
      return true;
    }

    Swal.fire(
    'Sessão Expirada',
    'Favor realizar novo Login.',
    'info'
    );

    this.router.navigate(['/login']);

    return false;
  }
}
