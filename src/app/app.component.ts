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

    translate.setDefaultLang('en-gb');
    translate.use('en-gb');

  }

  ngOnInit(): void {
    this.defaultLocale = "en-gb";
    this.browserLocale = this.localeService.getBrowserLocale();

    if (this.browserLocale === undefined) {
      this.browserLocale = this.defaultLocale;
    }

    this.selectedValue = this.browserLocale;

    this.translate.use(this.selectedValue);

  }

  selectLocale(event: any) {
    this.localeService.setLocale(event.target.value)
      .subscribe({
        next: (text) => this.text = text
      });
    console.log(`${event.target.value}, ${JSON.stringify(this.text)}`);
  }

  setLanguageSwitcher(event: any) {
    this.translate.setDefaultLang(event.target.value);
    this.translate.use(event.target.value)
  }

}
