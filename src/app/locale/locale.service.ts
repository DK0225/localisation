import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

declare interface Window {
  localStorage: any;
  location: any;
  navigator: any;
}

declare const window: Window;

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

  public getBrowserLocale(): string | undefined {

    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return undefined
    }

    let browserLocale: any = window.navigator.languages ? window.navigator.languages[0] : null;
    browserLocale = browserLocale || window.navigator.language;

    return browserLocale.toLowerCase();
  }

  public getDefaultLocale(): string {
    let browserLocale = this.getBrowserLocale();
    console.log(browserLocale);

    if (browserLocale !== undefined) {
      if (window.localStorage.getItem('localisation-currentLocale') != browserLocale) {
        window.localStorage.setItem('localisation-currentLocale', browserLocale);
      }
      return window.localStorage.getItem('localisation-currentLocale');
    }

    return "";
  }

  public setLocale(locale: string): Observable<any> {
    window.localStorage.setItem('localisation-currentLocale', locale);
    // window.location.reload();
    return this.getTranslation(locale);
  }

  public getLocale(): string {
    return window.localStorage.getItem('localisation-currentLocale');
  }

  public tearDown(): void {
    window.localStorage.removeItem('localisation-currentLocale');
    window.localStorage.clear();
  }

}
