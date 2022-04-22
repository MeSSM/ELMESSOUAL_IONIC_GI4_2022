import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Training } from 'src/app/models/training.model';



@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})

export class PickerComponent implements OnInit {
  @Output() loadTrainingEvent = new EventEmitter();
  @Input() trainingList : Training[];
  selectedTraining:any = null;
  pickerCounter = 0;
  nextDisplay = true;
  showForm = false;

  constructor() { }

  ngOnInit(): void {
  }



  getCardsInfo(container : any) : any{
    let card:any = document.querySelector('.card');
    let marginCard = (parseInt(getComputedStyle(card).margin)) * 2;
    let cardWidth = card.offsetWidth + marginCard
    let displayedCards = Math.floor(container.offsetWidth / cardWidth);
    let cardNumber = container.children.length;
    return [displayedCards, cardNumber, cardWidth]
  }

  enrollForm(training : any):void{
    this.showForm = true;
    this.selectedTraining = training;
  }

  backToBoardhandler(){
    this.showForm = false;
  }

  filterTrainings(event : any) : void{
    let searched = event.target.value;
    //this.trainingList = this.trainingDAO.loadTrainings().filter((e:any) => {return e.name.includes(searched)});
    
  }

  userScrolled(event: any) : void {
    let maxScrollLeft =  event.target.scrollWidth - event.target.clientWidth;
    let scrolled = event.target.scrollLeft;
    if (maxScrollLeft == scrolled){
      this.loadTrainingEvent.emit();
    }
  }


}
