import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  cityDataLogement = {
    lat: 0,
    lng: 0,
    price: '',
    title: '',
    type: '',
    img: '',
  };
  constructor(
    public afDB: AngularFireDatabase,
    public modalController: ModalController,
    public navParams: NavParams) {
      this.cityDataLogement.lat =  this.navParams.get('lat');
      this.cityDataLogement.lng =  this.navParams.get('lng');
    }

  ngOnInit() {
  }


  close(){
    this.modalController.dismiss();
  }

  addFirebase() {
    if (this.cityDataLogement.title !== '' &&
     this.cityDataLogement.price !== '' &&
      this.cityDataLogement.type !== '' &&
       this.cityDataLogement.img !== '') { // Si les champs sont remplis.
      this.afDB.list('Host/').push(this.cityDataLogement); // On ajoute le logement dans la base de données.
      this.close();// On ferme la modal.
    }

  }
}
