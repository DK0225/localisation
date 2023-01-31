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

  text!: Locale;

  browserLocale: string | undefined;

  selectedValue: string = "";

  currencyCode: string = "GBP";

  constructor(private localeService: LocaleService) { 

    this.browserLocale = this.localeService.getBrowserLocale();

  }

  ngOnInit(): void {
    this.selectedValue = this.localeService.getDefaultLocale();
    this.localeService.setLocale(this.selectedValue);
    
    this.currencyCode = this.localeService.getCurrencyCode();
  }

  ngOnDestroy(): void {
    this.localeService.tearDown();
  }

  setLanguageSwitcher(event: any) {
    this.localeService.setLocale(event.target.value);

    this.localeService.streamValue('currencyCode')
      .subscribe((translation: string) => {
        this.currencyCode = translation;
      })
  }

}
