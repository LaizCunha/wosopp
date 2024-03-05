import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, save } from 'ionicons/icons';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-form-arena',
  templateUrl: './form-arena.page.html',
  styleUrls: ['./form-arena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, StarRatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormArenaPage implements OnInit {

  public photoArena: string = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  private map?: GoogleMap;
  private markerId?: string;
  private readonly defaultZoom: number = 19;
  public form?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService
  ) {
    addIcons({ save, cameraOutline, camera });
  }

  ngOnInit() {
    this.createForm();
    this.createMap();
  }

  private createForm(): void {

    // this.form = new FormGroup({
    //   nome: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    //   endereco: new FormControl(null, [Validators.required,  Validators.maxLength(100)]),
    // });
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(50)]],
      imgBase64: [null, [Validators.required]],
      avaliacao: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]]
    });
    (window as any).form = this.form;
  }

  // Eventos:
  public async onClickCamera() {
    await this.changePhoto();
  }

  private async changePhoto() {
    const photo: Photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if (photo.base64String) {
      this.photoArena = 'data:image/png;base64,' + photo.base64String;
      this.form!.controls['imgBase64'].setValue(this.photoArena);

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
