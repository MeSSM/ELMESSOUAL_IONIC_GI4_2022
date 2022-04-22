import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { User } from './models/user.model';
import firebase from 'firebase/compat/app';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Training } from './models/training.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public currentUser : any;
  public TrainingCount: any;
  public userFavorite : Subject<Training[]> = new Subject<Training[]>();
  public userEnrollement : Subject<Training[]> = new Subject<Training[]>();
  favoritChanged$ = this.userFavorite.asObservable();
  newEnroll$ = this.userEnrollement.asObservable();






  constructor(private auth : AngularFireAuth, private db : AngularFireDatabase, private storage : AngularFireStorage, private router : Router) { 
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.trainingsCount();
  }

  async registerUser(user :User) : Promise<any> {
    try{
      const response = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
      let id = response.user.uid;
      user.id = id;
      this.db.list('Users').set(id, user);
      return new Promise<any>((res) => res('success'));
    }catch(e){
      console.log('ERROR');
      return new Promise<any>((res, err) => err('null'));
    }
  }

  async loginUser(credentials : any) : Promise<any> {
    try{
      const response = await this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      let id = response.user.uid;
      let user = this.db.object('/Users/' + id);
      return new Promise<any>((res) => {
        if(user){
          res(user);
        }
      });
    } catch(e){
      return null;
    }
  }

  checkLogin() : void {
    this.auth.currentUser.then(u => {
      if (u == null) this.router.navigate(['/home'], {replaceUrl: true});
    });
  }

  async getCurrentUser() : Promise<any> {
    const userRef = await this.auth.currentUser;
    var user = null;
    if (userRef != null){
      user = this.db.object('/Users/' + userRef.uid)
      user.valueChanges().subscribe(u => {
        this.currentUser = u;
        this.getEnrollement();
        this.getFavorite();
      });
      return new Promise(res => res(user));
    }else{
      this.router.navigate(['/home'], {replaceUrl: true})
    }
  }

  

  async getTranings(trainigList: any[], count : number) : Promise<any> {
    let trainings: AngularFireList<Training> = this.db.list('Trainings');
    let i = 0;
    // I used Timeout just to make sure you realise that it's dynamic loading
    setTimeout(()=>{
      trainings.valueChanges().subscribe(t => {
        t.forEach((training, index) => {
          if (i < count){
            let img = 'covers/' + training.id + '.jpg';
            this.storage.ref(img).getDownloadURL().subscribe(e => training.cover = e);
            
            if (trainigList[index] == null){
              trainigList[index] = training;
              i++;
            }  
          }
        });
        this.getFavorite();
      });
    }, 1000); 
  }

  async getTrainingsByCategorie(trainingsList: any[],count : number, category: string){
    let trainings: AngularFireList<Training> = this.db.list('Trainings');
    let i = 0;
    trainings.valueChanges().subscribe(t => {
      t.filter(e => e.category === category).forEach((training, index) => {
        if (i < count){
          let img = 'covers/' + training.id + '.jpg';
          this.storage.ref(img).getDownloadURL().subscribe(e => training.cover = e);
          if (trainingsList[index] == null){
            trainingsList[index] = training;
            i++;
          }
        }
      });
    });
  }



  async addFavorite(id : any) : Promise<void> {
    this.db.list('/Users/' + this.currentUser.id +'/favorite').push(id);
  }


  async deleteFavorite(id : any) : Promise<void>{
    let found = Object.keys(this.currentUser.favorite).find(e => this.currentUser.favorite[e].id == id);
    this.db.list('/Users/' + this.currentUser.id +'/favorite/' + found).remove();

  }

  addEnroll(training : any) : void {
    this.db.list('/Users/' + this.currentUser.id + '/enrollement/').push(training);
  }


  getTrainingById(id: any) : AngularFireObject<any>{
    return this.db.object('/Trainings/' + id);
  }


  async getFavorite() : Promise<void> {
    const userRef = await this.auth.currentUser;
    if (userRef == null) return;
    this.db.list('/Users/' + userRef.uid + '/favorite').valueChanges().subscribe(list => {
      this.userFavorite.next(Object.values(list) as Training[]);
  });
  }

  async getEnrollement() : Promise<void> {
    const userRef = await this.auth.currentUser;
    if (userRef == null) return;
    this.db.list('/Users/' + userRef.uid + '/enrollement/').valueChanges().subscribe(list => {
      this.userEnrollement.next(Object.values(list) as Training[]);
  });
  } 

  async isfavorite(id: number) : Promise<void> {
    this.db.list('/Users/' + this.currentUser.uid + '/favorite').valueChanges().subscribe(list =>{
      
    })
  }
  

  trainingsCount(){
    this.db.list('Trainings').valueChanges().subscribe(list => {
      this.TrainingCount = {all:0, 'Programming':0, 'WebDev Font-End':0, 'WebDev Back-End':0, 'Artifical Intelligence':0};
      this.TrainingCount.all = list.length;
      list.forEach((e : any) => {
          switch(e.category){
            case('WebDev Font-End'):
              this.TrainingCount['WebDev Font-End']++;
              break;
            case('WebDev Back-End'):
              this.TrainingCount['WebDev Back-End']++;
              break;
            case('Programming'):
              this.TrainingCount['Programming']++;
              break;
            case('Artifical Intelligence'):
              this.TrainingCount['Artifical Intelligence']++;
              break;
          }
      });
    });
  }
}
