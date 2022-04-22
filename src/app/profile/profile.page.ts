import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Training } from '../models/training.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user : User = null;
  trainingList : Training[] = [].constructor(5);
  

  constructor(private db : DatabaseService, private router : Router, private auth : AngularFireAuth) { }

  ngOnInit() {
    this.db.checkLogin();

  }

  logout() : void{
    this.auth.signOut();
    this.router.navigate(['/home']);
  }




  

}
