import { UserModal } from '../models/user-modal';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserService {

  constructor(private db : AngularFireDatabase) { }

save(User : firebase.User){
  this.db.object('/users/' +User.uid).update({
      name: User.displayName,
      email: User.email
  })
}
get(uid:string) : FirebaseObjectObservable<UserModal>{
 return this.db.object('/users/' + uid);
}
 
 
}
