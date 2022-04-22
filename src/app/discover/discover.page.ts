import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Training } from '../models/training.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  user : User;
  trainingList : Training[] = [].constructor(5);
  trainingListProgramming : Training[] = [].constructor(5);
  trainingListFrontEnd : Training[] = [].constructor(5);
  trainingListBackEnd : Training[] = [].constructor(3);
  trainingListAI : Training[] = [].constructor(2);
  constructor(private db : DatabaseService, private router : Router) { }

  ngOnInit() {

    this.db.getCurrentUser().then(e => {
      e?.valueChanges().subscribe(e => this.user = e);
    });

    //this.db.getFavorite()
    this.db.getTranings(this.trainingList, 5);
    this.db.getTrainingsByCategorie(this.trainingListProgramming, 5, 'Programming');
    this.db.getTrainingsByCategorie(this.trainingListFrontEnd, 5, 'WebDev Font-End');
    this.db.getTrainingsByCategorie(this.trainingListBackEnd, 5, 'WebDev Back-End');
    this.db.getTrainingsByCategorie(this.trainingListAI, 5, 'Artifical Intelligence');
  }

  loadTrainings(list : any[], count: number, type : string) : void {
    for(let i=0; i<count;i++) {
      if (this.db.TrainingCount[type] <= list.length) break;
      list.push(null);
    }
    if (type == 'all'){
      this.db.getTranings(list, count);
    }else {
      this.db.getTrainingsByCategorie(list, count, type);
    }
    
  }


  loadTrainingReceiver(list, type : string) : void {
    this.loadTrainings(list, 5, type);
    //console.log(this.db.TrainingCount)
    //console.log(list)
  }

}
