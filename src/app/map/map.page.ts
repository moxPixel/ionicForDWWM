import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Environment, GoogleMap, GoogleMaps, GoogleMapsEvent, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { ModalController, Platform } from '@ionic/angular';
import { AddPage } from '../add/add.page';

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

showRoom = {
  title:'',
  img:'',
  price:'',
  type:'',
};

map: GoogleMap;
markers: any;
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
      this.loadMarker(); // On charge les markers si on est sur un appareil
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

  async openAddPage(){
     const modal = await this.modalController.create({
       component:AddPage,
        componentProps:{
          lat: this.map.getCameraPosition().target.lat,
          lng: this.map.getCameraPosition().target.lng,
        }
     });
     return await modal.present();
  }

//Derniere partit du projet. On ajoute les markers.
loadMarker() {
  this.afDB.list('Host/').snapshotChanges(['child_added']).subscribe(datas => { // On recupere les données de la base de données.
  this.map.clear(); // On efface les markers.
    datas.forEach(element => { // On parcours les données.
      // eslint-disable-next-line max-len
      const markerIcon = this.createMarkerIcon(element.payload.exportVal().price, '#FF5A5F'); // On crée un marker personalisé.
    this.markers =  this.map.addMarkerSync({ // On ajoute un marker.
        animation: 'DROP',
        icon: markerIcon,
        position: { // On definit la position du marker.
          lat: element.payload.exportVal().lat,
          lng: element.payload.exportVal().lng
        }
      });
      this.markers.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { // on ajoute un evenement au marker.
        this.showRoom.title = element.payload.exportVal().title; // On affecte le titre a l object showroom
        this.showRoom.img = element.payload.exportVal().img; // On affecte l'image a l object showroom
        this.showRoom.price = element.payload.exportVal().price; // On affecte le prix a l object showroom
        this.showRoom.type = element.payload.exportVal().type; // On affecte le type a l object showroom
      });
    });
  });
}


//  ont créé un marker personalisé.
createMarkerIcon(price: number, color: string) {
  const canvas = document.createElement('canvas'); // On crée un canvas.
  canvas.width = 47; // On definit la largeur du canvas.
  canvas.height = 39; // On definit la taille du canvas.
  const rectangle = canvas.getContext('2d'); // On definit le contexte du canvas.
  rectangle.beginPath();  // On definit le chemin du canvas.
  rectangle.rect(2, 2, 43, 26); // On definit la taille du rectangle.
  rectangle.fillStyle = color; // On definit la couleur du rectangle.
  rectangle.lineWidth = 2; // On definit la largeur de la ligne.
  rectangle.strokeStyle = '#666666'; // On definit la couleur de la ligne.
  rectangle.stroke(); // On trace la ligne.
  rectangle.fill(); // On remplit le rectangle.
  const triangle = canvas.getContext('2d'); // On definit le contexte du canvas.
  triangle.beginPath(); // On definit le chemin du canvas.
  triangle.moveTo(12, 28); // On definit la position du triangle.
  triangle.lineTo(32, 28); // On definit la position du triangle.
  triangle.lineTo(22, 38); // On definit la position du triangle.
  triangle.closePath(); // On definit la position du triangle.
  triangle.fillStyle = color;
  triangle.fill(); // On remplit le triangle.
  const bord = canvas.getContext('2d');  // On definit le contexte du canvas.
  bord.beginPath();  // On definit le chemin du canvas.
  bord.moveTo(12, 28); // On definit la position du triangle.
  bord.lineTo(22, 38); // On definit la position du triangle.
  bord.lineTo(32, 28); // On definit la position du triangle.
  bord.lineWidth = 1; // On definit la largeur de la ligne.
  bord.strokeStyle = '#666666'; // On definit la couleur de la ligne.
  bord.stroke(); // On trace la ligne.
  const text = canvas.getContext('2d'); // On definit le contexte du canvas.
  text.font = '11pt Arial'; // On definit la taille de la police.
  text.fillStyle = 'white'; // On definit la couleur du texte.
  if (price > 100) { // Si le prix est supérieur à 100.
      text.fillText(price + '€', 7, 21); // On affiche le prix.
  } else {
      text.fillText(price + '€', 11, 21);
  }
  return canvas.toDataURL(); // On retourne le canvas.


}



}
