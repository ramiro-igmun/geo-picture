import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {PhotoService} from '../services/photo.service';
import {marker} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: L.Map;
  locations: {location: L.LatLngTuple, src: string }[] = [];

  options: L.MapOptions = {
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 17,
    center: L.latLng([ 43.304962, -2.973806 ])
  };

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.map) {
      this.onMapReady(this.map);
    }
  }

  async onMapReady($event: L.Map) {
    this.map = $event;
    await this.photoService.getPhotos();
    this.locations = this.photoService.photos.map(photo => ({location: [photo.latitude, photo.longitude], src: photo.webPath}));
    if (this.locations.length) {
      this.map.fitBounds(this.locations.map(location => location.location));
      this.paintMarkers(this.locations);
    }
  }

  private paintMarkers(locations: {location: L.LatLngTuple, src: string }[]) {
    locations.forEach(location => {
      const photoMarker = marker(location.location, {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon-blue.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      });
      photoMarker.bindPopup(`<img src="${location.src}" style="height: auto; width: 200px">`,
          {offset: L.point(0, -20), maxWidth: 200 });
      photoMarker.addTo(this.map);
    });
  }
}
