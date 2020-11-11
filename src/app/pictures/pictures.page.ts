import { PhotoService } from '../services/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos();
  }

  takePhoto() {
    this.photoService.takePhoto();
  }

}
