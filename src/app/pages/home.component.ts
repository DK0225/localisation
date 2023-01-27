import { Component, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  list: string[] = [];

  defaultLocale: string;

  constructor(private translate: TranslateService) {

    this.defaultLocale = translate.getDefaultLang();
    console.log(`Home: ${this.defaultLocale}`);

    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      console.log(event.lang)
    });

  }

  ngOnInit(): void {
    this.translate.stream('home.list')
      .subscribe((translation: string[]) => {
        this.list = translation
      });
  }

}
