import { Injectable } from '@angular/core';
import { Training } from './models/training.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
  
  private training: Training;

  setTraining(training : Training) : void {
    this.training = training;
  }

  getTrining() : Training {
    return this.training;
  }

}
