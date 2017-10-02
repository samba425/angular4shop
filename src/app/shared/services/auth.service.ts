import { UserModal } from '../models/user-modal';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute} from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
User$ : Observable<firebase.User>;
  constructor(private userService: UserService,private authfirebaseAuth : AngularFireAuth, private route: ActivatedRoute) {
     this.User$ = authfirebaseAuth.authState;
   }


    login() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl',returnUrl)
       this.authfirebaseAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.authfirebaseAuth.auth.signOut();
    }


  get AuthUser$() : Observable<UserModal>{
return this.User$
       .switchMap(user => {
            if(user) return this.userService.get(user.uid);

            return Observable.of(null);
       } );
  }
}
