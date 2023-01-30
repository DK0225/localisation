import { Component } from '@angular/core';
import { LocaleService } from './locale/locale.service';
import { Locale } from './locale/locale';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'localisation';

  defaultLocale: string = "";

  text!: Locale;

  browserLocale: string | undefined = this.defaultLocale;

  selectedValue: string = "";

  constructor(private localeService: LocaleService, private translocoService: TranslocoService) { 
    this.browserLocale = this.localeService.getBrowserLocale();
    if (this.browserLocale) {
      translocoService.setDefaultLang(this.browserLocale);
      translocoService.setActiveLang(this.browserLocale);
    }
  }

  ngOnInit(): void {
    this.defaultLocale = this.localeService.getDefaultLocale();

    this.browserLocale = this.defaultLocale;

    this.selectedValue = this.localeService.getDefaultLocale();

  }

  ngOnDestroy(): void {
    this.localeService.tearDown();
  }

  setLanguageSwitcher(event: any) {
    this.localeService.setLocale(event.target.value);
  }

}
