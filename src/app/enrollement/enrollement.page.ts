import { Component, OnInit } from '@angular/core';
import { Training } from '../models/training.model';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollement',
  templateUrl: './enrollement.page.html',
  styleUrls: ['./enrollement.page.scss'],
})
export class EnrollementPage implements OnInit {
  enrolled : Training[] = [];
  constructor(private db : DatabaseService, private router : Router) { 
    this.db.newEnroll$.subscribe(list => {
      this.enrolled = list;
    });
    this.db.getEnrollement();
  }

  ngOnInit() {
  }

}
