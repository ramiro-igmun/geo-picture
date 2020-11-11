import { Injectable } from '@angular/core';
import { PhotoMetadata } from 'src/app/models/PhotoMetadata.model';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoDataService {

  private STORAGE_KEY = 'photos';

  constructor() { }

  async getPhotosMetadata(): Promise<PhotoMetadata[]> {
    const { value } = await Storage.get({key: this.STORAGE_KEY});
    return JSON.parse(value) || [];
  }

  async savePhotosMetadata(photos: PhotoMetadata[]) {
    await Storage.set({ key: this.STORAGE_KEY, value: JSON.stringify(photos) });
  }

}
