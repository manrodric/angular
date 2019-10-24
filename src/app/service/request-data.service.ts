import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  private baseUrl = 'http://192.168.6.40:8070/servicesREST/utilitarios';

  constructor(private http: HttpClient) { }

  sendRequest(requestData: any): Observable<any> {
    return this.http.post(this.baseUrl+'/servicioUtilitarioCP', requestData);
  }
  
  getOperacion(): Observable<any>{
    return this.http.get(this.baseUrl+'/obtenerOpciones');
    }
}
