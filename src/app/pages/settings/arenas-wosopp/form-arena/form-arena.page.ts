import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { addIcons } from 'ionicons';
import { save } from 'ionicons/icons';

@Component({
  selector: 'app-form-arena',
  templateUrl: './form-arena.page.html',
  styleUrls: ['./form-arena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, StarRatingComponent]
})
export class FormArenaPage implements OnInit {

  constructor() {
    addIcons({ save })
  }

  ngOnInit() {
    console.log('on init');
    // TODO: criar o form
  }

}
