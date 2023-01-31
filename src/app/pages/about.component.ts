import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../locale/locale.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  currencyCode!: string;
  locale: string = "";

  constructor(private localeService: LocaleService) { }
  
  ngOnInit(): void {
    this.locale = this.localeService.getLocale();
    this.currencyCode = this.localeService.getCurrencyCode();
    
    this.localeService.streamValue('currencyCode')
      .subscribe((translation: string) => {
        this.currencyCode = translation;
      });

    this.localeService.onLangChange().subscribe(() => {
      this.locale = this.localeService.getLocale();
      console.log(this.locale);
    })
  }

}
