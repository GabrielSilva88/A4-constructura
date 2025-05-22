import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { IAutenticador } from '../../login/autenticador.interface';
import { DaoService } from './dao.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private daoService:DaoService
  ) { }

  login(login:IAutenticador): Observable<HttpResponse<IAutenticador>>{
    return this.daoService.post<IAutenticador>(AppSettings.AUTENTICADOR_URL,login,DaoService.MEDIA_TYPE_APP_JSON)
  }
}
//refactor=> return this.daoService.post<IAutenticador>(this.settings.autenticador,login,DaoService.MEDIA_TYPE_APP_JSON)