import { PhotoMetadata } from './../models/PhotoMetadata.model';
import { Plugins, CameraPhoto, FilesystemDirectory } from '@capacitor/core';
import { Injectable } from '@angular/core';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  public async saveFile(photo: CameraPhoto): Promise<string> {
    const base64Data = await this.readAsBase64(photo) as string;
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    return fileName;
  }

  public async deleteFile(photoData: PhotoMetadata) {
    Filesystem.deleteFile({path: photoData.filePath, directory: FilesystemDirectory.Data});
  }

  private async readAsBase64(photo: CameraPhoto): Promise<string | ArrayBuffer> {
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return this.convertBlobToBase64(blob);
  }

  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
}
