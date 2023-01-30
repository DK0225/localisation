import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  list: any = [];
  sub!: Subscription;

  defaultLocale: string = '';

  constructor(private translocoService: TranslocoService) {

  }

  ngOnInit(): void {
    this.sub = this.translocoService.langChanges$.subscribe(() => {
      console.log('language changed!');
      this.translocoService.selectTranslate('home.list')
      .subscribe(
        value => this.list = value
      );
    });
    this.sub.unsubscribe();
  }

}
