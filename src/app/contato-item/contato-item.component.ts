import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato-item',
  templateUrl: './contato-item.component.html',
  styleUrls: ['./contato-item.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ContatoItemComponent  implements OnInit {
  @Input() contact: any;

  constructor() { }

  ngOnInit() {}

}
