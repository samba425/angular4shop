import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private userService: UserService,private auth : AuthService, router: Router) {
    this.auth.User$.subscribe(User => {
      if(!User) return;
        userService.save(User);

       let returnUrl = localStorage.getItem('returnUrl');
           if(!returnUrl) return; 
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
    });
  }
}
