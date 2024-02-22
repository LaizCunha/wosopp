import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, save } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-form-arena',
  templateUrl: './form-arena.page.html',
  styleUrls: ['./form-arena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, StarRatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FormArenaPage implements OnInit {

  public photoArena: string = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  private map?: GoogleMap;
  private markerId?: string;
  private readonly defaultZoom: number = 19;

  constructor(
    private toastCtrl: ToastController
  ) {
    addIcons({ save, cameraOutline, camera })
  }

  ngOnInit() {
    console.log('on init');

    this.createMap();
  }

  public async onClickCamera() {
    await this.changePhoto();
  }

  private async changePhoto() {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (photo.webPath) {
      this.photoArena = photo.webPath;
    }
  }

  private async createMap() {
    const currentPos: Position = await Geolocation.getCurrentPosition();

    this.map = await GoogleMap.create({
      id: 'mapa-arena',
      element: document.getElementById('map')!,
      apiKey: environment.googleMapsApi,
      config: {
        center: {
          lat: currentPos.coords.latitude,
          lng: currentPos.coords.longitude
        },
        zoom: this.defaultZoom
      },
    });

    // Registra o evento de clique no mapa para uma função anônima passada como argumento.
    this.map.setOnMapClickListener(async (data) => {
      const marker = {
        coordinate: {
          lat: data.latitude,
          lng: data.longitude
        }
      };
      if (this.markerId) {
        this.map?.removeMarker(this.markerId);
      }
      this.markerId = await this.map?.addMarker(marker);
    });

  }

  onClickSave() {

  }

}
