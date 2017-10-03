import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
   NgbModule.forRoot(),   //NgbModule for ng-bootstrap 
   RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports : [
  NavbarComponent
  ]
})
export class CoreModule { }
 