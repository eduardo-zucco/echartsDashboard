import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dash-inicial',
  templateUrl: './dash-inicial.page.html',
  styleUrls: ['./dash-inicial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashInicialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
