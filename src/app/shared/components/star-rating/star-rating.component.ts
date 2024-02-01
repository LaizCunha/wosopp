import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class StarRatingComponent {

  @Input()
  public rating: number = 0;

  @Output()
  public ratingChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    addIcons({ star });
  }

  public onClickRate(newRating: number): void {
    this.rating = newRating;
    this.ratingChange.emit(newRating);
  }

  public getColor(rating: number): string {
    if (this.isAboveRating(rating)) {
      return 'gray';
    }
    switch (this.rating) {
      case 1:
      case 2:
        return 'red';
      case 3:
        return 'orange';
      case 4:
      case 5:
        return '#ffcd00';
      default:
        return 'gray';
    }
  }

  private isAboveRating(index: number): boolean {
    return index > this.rating;
  }

}
