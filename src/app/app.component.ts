import { Component } from '@angular/core';
import { LocaleService } from './locale/locale.service';
import { Locale } from './locale/locale';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private localeService: LocaleService, private translate: TranslateService) { 

    this.browserLocale = this.localeService.getBrowserLocale();
    if (this.browserLocale) {
      translate.setDefaultLang(this.browserLocale);
      translate.use(this.browserLocale);
    }

  }

  ngOnInit(): void {
    this.defaultLocale = this.localeService.getDefaultLocale();

    this.browserLocale = this.defaultLocale;

    // if (this.browserLocale === undefined) {
    //   this.browserLocale = this.defaultLocale;
    // }

    // this.selectedValue = this.browserLocale;

    this.selectedValue = this.defaultLocale;

    this.translate.use(this.selectedValue);

  }

  ngOnDestroy(): void {
    this.localeService.tearDown();
  }

  setLanguageSwitcher(event: any) {
    this.translate.setDefaultLang(event.target.value);
    this.localeService.setLocale(event.target.value);
    this.translate.use(event.target.value)
  }

}
