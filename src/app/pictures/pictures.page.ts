import { PhotoMetadata } from '../models/PhotoMetadata.model';
import { PicturePopoverComponent } from './picture-popover/picture-popover.component';
import { PhotoService } from '../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {

  constructor(public photoService: PhotoService,
              private popoverController: PopoverController) { }

  ngOnInit() {
    this.photoService.getPhotos();
  }

  takePhoto() {
    this.photoService.takePhoto();
  }

  async openPopOver(ev: any, photo: PhotoMetadata) {

    const popover = await this.popoverController.create({
      component: PicturePopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const result = await popover.onDidDismiss();
    if (result?.data) {
      await this.photoService.deletePhoto(photo);
    }
  }

}
