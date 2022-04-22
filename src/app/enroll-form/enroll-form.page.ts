import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Training } from '../models/training.model';
import { AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.page.html',
  styleUrls: ['./enroll-form.page.scss'],
})
export class EnrollFormPage implements OnInit {
  daysLeft : any;
  trainingDuration : any;
  selectedTrainig : Training = null;
  enrolled: boolean = false;
  constructor(private activeRoute : ActivatedRoute, private db : DatabaseService, private storage : AngularFireStorage) { 
    this.db.getEnrollement();
    this.db.newEnroll$.subscribe(e =>{
      if (e != undefined && this.selectedTrainig != undefined )
        this.enrolled = e.find(l => l.id == this.selectedTrainig.id)?true:false;
    });    
  }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id')
    this.db.getTrainingById(id).valueChanges().subscribe(training => {
        this.selectedTrainig = training;
        let [a,b,c] = this.selectedTrainig.startingDate.split('-').map(e => Number(e));
        let [e,f,g] = this.selectedTrainig.endingDate.split('-').map(e => Number(e));
        let date:Date = new Date(a,b,c)
        this.daysLeft = Math.floor((date.getTime() - (new Date()).getTime())/1000/3600/24);
        this.trainingDuration = Math.round((new Date(e,f,g).getTime() - new Date(a,b,c).getTime())/1000/3600/24/30);
        let img = 'covers/' + training.id + '.jpg';
        this.storage.ref(img).getDownloadURL().subscribe(e => this.selectedTrainig.cover = e);
        console.log(training);
      });
    
    
  }

  enroll(event) : void {
    this.enrolled = true;
    this.db.addEnroll(this.selectedTrainig);
  }

}
