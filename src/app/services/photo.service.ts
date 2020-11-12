import {FileService} from './file.service';
import {PhotoDataService} from './storage.service';
import {PhotoMetadata} from 'src/app/models/PhotoMetadata.model';
import {Injectable} from '@angular/core';
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

const {Camera} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    photos: PhotoMetadata[] = [];

    constructor(private storageService: PhotoDataService,
                private fileService: FileService,
                private geolocation: Geolocation) {
    }

    public async takePhoto() {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            quality: 90,
            source: CameraSource.Camera,
        });

        const geoPosition = await this.geolocation.getCurrentPosition();

        const filePath = await this.fileService.saveFile(photo);

        this.photos = [
            ...this.photos, {
                webPath: photo.webPath,
                filePath,
                longitude: geoPosition.coords.longitude,
                latitude: geoPosition.coords.latitude
            }
        ];
        console.log(this.photos);
        await this.storageService.savePhotosMetadata(this.photos);
    }

    public async getPhotos() {
        this.photos = await this.storageService.getPhotosMetadata();
    }

    public async deletePhoto(photo: PhotoMetadata) {
        this.photos = this.photos.filter(element => element.filePath !== photo.filePath);
        await this.storageService.savePhotosMetadata(this.photos);
        await this.fileService.deleteFile(photo);
    }

}
