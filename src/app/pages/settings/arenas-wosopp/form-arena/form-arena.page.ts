import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, save } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-form-arena',
  templateUrl: './form-arena.page.html',
  styleUrls: ['./form-arena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, StarRatingComponent]
})
export class FormArenaPage implements OnInit {

  public photoArena: string = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';

  constructor() {
    addIcons({ save, cameraOutline, camera })
  }

  onClickCamera() {
    this.changePhoto();
  }

  onClickSave() {

  }

  private async changePhoto() {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (photo.webPath) {
      this.photoArena = photo.webPath;
    }

  }

  ngOnInit() {
    console.log('on init');
    // TODO: criar o form
  }

}
