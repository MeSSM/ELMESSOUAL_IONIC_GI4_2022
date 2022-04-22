import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/models/training.model';
import { DatabaseService } from 'src/app/database.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() training : any;
  enrolled : boolean;

  isFavorite : boolean;
  constructor(private router : Router, private db : DatabaseService) { 
    this.db.favoritChanged$.subscribe(e => {
      if (e != undefined && this.training != undefined )
        this.isFavorite = e.find(tr => tr.id == this.training.id)?true:false;
    });
    this.db.newEnroll$.subscribe(list => {
      if (list != undefined && this.training != undefined){
        this.enrolled = list.find(tr => tr.id == this.training.id)?true:false;
      }
    });
    this.db.getEnrollement();
  }

  ngOnInit(): void {
    
  }

  onEnroll() : void {
    this.router.navigate(['/profile/enroll/' + this.training.id])
  }

  onFavorite(event : any) : void {
    if (!this.isFavorite){
      this.db.addFavorite(this.training);
    } else{
      this.db.deleteFavorite(this.training.id);
    }
    

  }



}
