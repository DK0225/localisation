import { Component } from '@angular/core';
import { LocaleService } from './locale/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'localisation';

  locale: string = "";

  text!: Locale;

  constructor(private localeService: LocaleService) { }

  ngOnInit(): void {
    this.locale = "en-gb";

    this.localeService.getTranslation(this.locale)
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

}

export interface Locale {
  app: {
    header: string,
    greeting: string,
    example: string
  },
  home: {
    header: string,
    example: string,
    list: string[]
  }
}