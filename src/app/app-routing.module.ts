import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about.component';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  // { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
