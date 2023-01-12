import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  }

  ngOnInit(): void {
    this.translate.get('home.list')
      .subscribe((translation: string[]) => {
        this.list = translation
      });
  }

}
