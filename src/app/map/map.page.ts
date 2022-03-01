import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Environment, GoogleMap, GoogleMaps, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
currentCity = {
  name: '',
  lat: 0,
  lng: 0
};

map: GoogleMap;

  constructor(
    public afDB: AngularFireDatabase,
    private route: ActivatedRoute,
    private platform: Platform,
    public modalController: ModalController
  ) {

    this.currentCity.name = this.route.snapshot.paramMap.get('name'); // On récupère le nom de la ville
    this.currentCity.lat = parseFloat(this.route.snapshot.paramMap.get('lat')); // On récupère la latitude de la ville
    this.currentCity.lng = parseFloat(this.route.snapshot.paramMap.get('lng'));// On récupère la longitude de la ville
  }

  ngOnInit() {
    if(this.platform.is('cordova')){
      this.loadMap(); // On charge la carte si on est sur un appareil
    }

  }

  loadMap(){ // Fonction pour charger la carte
    Environment.setEnv({ // On définit les paramètres de la carte
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDFsnZXBhqhRll7tQ9l1z6LJciAaZyBBMA', // API KEY
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDFsnZXBhqhRll7tQ9l1z6LJciAaZyBBMA' // API KEY
    });

    this.map = GoogleMaps.create('map_canvas', {
      mapType: GoogleMapsMapTypeId.NORMAL, // Type de carte
      camera: { // Position de la carte
        target:{
          lat: this.currentCity.lat, // Latitude de la ville
          lng: this.currentCity.lng // Longitude de la ville
        },
        zoom: 15, // Zoom de la carte
        tilt:30 // Angle de la carte
      }
    }); // On crée la carte
  }

}
