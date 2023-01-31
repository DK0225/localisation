import { Component, Input } from '@angular/core';
import { LocaleService } from '../locale/locale.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  list: string[] = [];

  constructor(private localeService: LocaleService) {

  }

  ngOnInit(): void {
    this.localeService.streamValue('home.list')
      .subscribe((translation: string[]) => {
        this.list = translation
      });
  }

}
