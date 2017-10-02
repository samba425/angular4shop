import { UserModal } from '../../shared/models/user-modal';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
  return this.auth.AuthUser$
        .map(UserModal => UserModal.isAdmin);
  }

}
