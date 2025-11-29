import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ContatoItemComponent } from '../contato-item/contato-item.component';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ContatoItemComponent]
})
export class ListarContatosPage implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
