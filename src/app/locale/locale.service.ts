import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService, private httpClient: HttpClient) { 

    this.prefix = "/assets/locales/";
    this.suffix = ".json";
  }

  public getTranslation(lang: string): Observable<any> {
    console.log(`${this.prefix}${lang}${this.suffix}`)
    return this.httpClient.get(`${this.prefix}${lang}${this.suffix}`);
  }

  public getCurrencyCode(): string {
    let x = "";
    this.translate.get('currencyCode')
      .subscribe((currencyCode: string) => {
        x = currencyCode;
      });
    return x;
  }
  
  public streamValue(value: string): Observable<any> {
    return this.translate.stream(value);
  }

  public getBrowserLocale(): string | undefined {

    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return undefined;
    }

    let browserLocale: any = window.navigator.languages ? window.navigator.languages[0] : null;
    browserLocale = browserLocale || window.navigator.language;

    browserLocale = browserLocale.toLowerCase();

    this.translate.setDefaultLang(browserLocale);
    this.translate.use(browserLocale);

    return browserLocale;
  }

  public getDefaultLocale(): string {
    let browserLocale = this.getBrowserLocale();

    if (browserLocale !== undefined) {
      if (window.localStorage.getItem('localisation-currentLocale') != browserLocale) {
        window.localStorage.setItem('localisation-currentLocale', browserLocale);
      }
      this.translate.use(browserLocale);
      return window.localStorage.getItem('localisation-currentLocale');
    }

    return "";
  }

  public setLocale(locale: string): void {
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    this.getTranslation(locale);
    window.localStorage.setItem('localisation-currentLocale', locale);
  }

  public getLocale(): string {
    return this.translate.currentLang;
  }

  public onLangChange(): Observable<any> {
    return this.translate.onLangChange;
  }

  public tearDown(): void {
    window.localStorage.removeItem('localisation-currentLocale');
    window.localStorage.clear();
  }

}
