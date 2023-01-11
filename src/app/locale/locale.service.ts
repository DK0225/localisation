import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  prefix: string;
  suffix: string;

  constructor(private httpClient: HttpClient) { 

    this.prefix = "/assets/locales/";
    this.suffix = ".json"

  }

  public getTranslation(lang: string): Observable<any> {
    console.log(`${this.prefix}${lang}${this.suffix}`)
    return this.httpClient.get(`${this.prefix}${lang}${this.suffix}`);
  }



  setLocale(locale: string): Observable<any> {
    return this.getTranslation(locale);
  }

}
