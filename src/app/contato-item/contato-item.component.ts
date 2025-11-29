import { Component, Input, Output, EventEmitter } from '@angular/core';
import { createOutline, trashOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato-item',
  templateUrl: './contato-item.component.html',
  styleUrls: ['./contato-item.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ContatoItemComponent {
  @Input() contact: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  createIcon = createOutline;
  trashIcon = trashOutline;

  constructor() {}
}
