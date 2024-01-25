import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenu, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, reader, star } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonMenuButton, IonMenu, IonRow, IonCol, IonIcon, IonList, IonItem, IonLabel],
})
export class HomePage {
  constructor() {
    addIcons({ camera, reader, star })
  }
}
