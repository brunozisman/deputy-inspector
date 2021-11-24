import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { APIResponse, Deputado, Deputados, Eventos } from '../models/deputy-model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment as env }  from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //deputados?nome=bruna&ordem=ASC&ordenarPor=nome

  deputados = new BehaviorSubject<Deputados[]>([]);
  currentD = this.deputados.asObservable();

  pages = new BehaviorSubject<number>(1);
  page = this.pages.asObservable();

  constructor(private http: HttpClient) { }

  public setDeputados(deputados: Deputados[]): void {
    this.deputados.next(deputados);
  }

  public resetPage(): void {
    this.pages.next(1);
  }

  getDeputyList(
    ordem: string,
    search?: string
  ): Observable<APIResponse<Deputados>> {
    let params = new HttpParams().set('ordem', ordem);

    if(search) {
      params = new HttpParams().set('ordem', ordem).set('search', search);
    }    

    return this.http.get<APIResponse<Deputados>>(`${env.BASE_URL}/deputados`);
  }

  getDeputy(
    nome: string,
    partido: string,
    estado: string,
    sexo: string    
  ): Observable<APIResponse<Deputados>> {

    return this.http.get<APIResponse<Deputados>>(`${env.BASE_URL}/deputados`, {params: new HttpParams().set('nome', nome).set('siglaUf', estado).set('siglaPartido', partido).set('siglaSexo', sexo)})
  }

  getDeputyById(
    id: number
  ): Observable<APIResponse<Deputado>> {
    return this.http.get<APIResponse<Deputado>>(`${env.BASE_URL}/deputados/${id}`)
  }

  getDeputyEvents(
    id: number
  ): Observable<APIResponse<Eventos>> {
    return this.http.get<APIResponse<Eventos>>(`${env.BASE_URL}/deputados/${id}/eventos`)
  }


}
