import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 showForm: boolean; // Variable pour afficher le formulaire (true) ou (false)
 fireBaseData = { // Objet qui represente une ville
   name:'',
   img:'',
   lat: '',
   lng: ''
 };
 cities: Observable<any[]>; // Variable pour recuperer les villes dans la base de donnée firebase

  constructor(
    public afDB: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.loadCities();

  }


  add(){ // Fonction pour afficher le formulaire
  this.showForm = !this.showForm;
  }

  addFireBase(){
    if(this.fireBaseData.name !== '' && this.fireBaseData.img !== '' && this.fireBaseData.lat !== '' && this.fireBaseData.lng !== ''){
    this.afDB.list('City/').push(this.fireBaseData); // Ajout dans la base de donnée
    this.add(); // On ferme le formulaire
    this.fireBaseData = { // Ont vide les champs du formulaire
      name:'',
      img:'',
      lat: '',
      lng: ''
    };
  }
  }


  loadCities() {
    this.cities = this.afDB.list('City/').valueChanges();
  }
}

