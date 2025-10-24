import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  home,
  list,
  listCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {
  constructor(private router: Router) {
    addIcons({ heart, heartOutline, home, list, listCircle });
  }

  goToEchart(): void {
    this.router.navigate(['dashboard-sweb']);
  }

  goToNg2(): void {
    this.router.navigate(['dashboard-ng2-charts']);
  }

  goToGoogle(): void {
    this.router.navigate(['dashboard-google-charts']);
  }
}
