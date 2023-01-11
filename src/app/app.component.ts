import { Component } from '@angular/core';
import { LocaleService } from './locale/locale.service';
import { Locale } from './locale/locale';

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

  constructor(private localeService: LocaleService) { }

  ngOnInit(): void {
    this.defaultLocale = "en-gb";
    this.browserLocale = this.localeService.getBrowserLocale();

    if (this.browserLocale === undefined) {
      this.browserLocale = this.defaultLocale;
    }

    this.selectedValue = this.browserLocale;

    this.localeService.getTranslation(this.browserLocale)
    .subscribe({
      next: (text) => this.text = text
    });

  }

  selectLocale(event: any) {
    this.localeService.setLocale(event.target.value)
      .subscribe({
        next: (text) => this.text = text
      });
    console.log(`${event.target.value}, ${JSON.stringify(this.text)}`);
  }

  setLanguageSwitcher() {

  }

}
