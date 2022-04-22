import { Component, OnInit } from '@angular/core';
import { Training } from '../models/training.model';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favorite : any[] = [];
  enrolled : Training[] = [];
  constructor(private db : DatabaseService, private router : Router) { 
    this.db.newEnroll$.subscribe(list => {
      this.enrolled = list;
    })
    this.db.favoritChanged$.subscribe(favs => {
      let newfavs : any[] = favs.map((e:any) => {
        e['enrolled'] = this.enrolled.find(l => l.id == e.id)?true:false;
        return e;
      });
      this.favorite = newfavs;

    });
    this.db.getEnrollement();
    this.db.getFavorite();
  }

  ngOnInit() {
    this.db.getFavorite();
  }

  onEnroll(id : any){
    this.router.navigate(['/profile/enroll/' + id]);
  }

}
