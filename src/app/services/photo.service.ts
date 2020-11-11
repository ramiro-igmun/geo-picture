import { FileService } from './file.service';
import { PhotoDataService } from './storage.service';
import { PhotoMetadata } from 'src/app/models/PhotoMetadata.model';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photos: PhotoMetadata[] = [];

  constructor(private storageService: PhotoDataService,
              private fileService: FileService) { }

  public async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90,
      source: CameraSource.Camera,
    });

    const filePath = await this.fileService.saveFile(photo);

    this.photos = [...this.photos, { webPath: photo.webPath, filePath}];
    this.storageService.savePhotosMetadata(this.photos);
  }

  public async getPhotos() {
    this.photos = await this.storageService.getPhotosMetadata();
  }

}
