import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { FirebaseService } from '../services/firebase.service';
import { ContatoItemComponent } from '../contato-item/contato-item.component';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ContatoItemComponent,
    RouterLink,
  ],
})
export class ListarContatosPage implements OnInit {
  users: any[] = [];
  addIcon = add;
  isEditOpen = false;
  editData: any = { id: '', nome: '', email: '', telefone: '' };

  private apiService = inject(ApiService);
  private firebaseService = inject(FirebaseService);
  private alertCtrl = inject(AlertController);

  ngOnInit() {
    // Etapa 3: Consumo de API RESTful (Obrigatório na avaliação)
    this.apiService.getUsers().subscribe((apiData) => {
      // Marcamos como 'api' para não mostrar botões de editar/excluir
      const apiUsers = apiData.map((u) => ({ ...u, source: 'api' }));
      this.users = apiUsers;

      // Etapa 4: CRUD Firebase
      this.firebaseService.getContatos().subscribe((firebaseData) => {
        if (firebaseData) {
          // Marcamos como 'firebase' para permitir edição/exclusão
          const firebaseUsers = firebaseData.map((u) => ({
            ...u,
            source: 'firebase',
          }));
          // Juntamos as duas listas: Firebase primeiro (mais relevante), depois API
          this.users = [...firebaseUsers, ...apiUsers];
        }
      });
    });
  }

  async excluir(user: any) {
    if (user.id && typeof user.id === 'string') {
      const alert = await this.alertCtrl.create({
        header: 'Excluir contato',
        message: `Apagar ${user.nome || user.name}?`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Apagar',
            role: 'destructive',
            handler: () => {
              this.firebaseService
                .deleteContato(user.id)
                .then(() => console.log('Contato excluído'))
                .catch((err) => console.error(err));
            },
          },
        ],
      });
      await alert.present();
    } else {
      const info = await this.alertCtrl.create({
        header: 'Atenção',
        message:
          'Não é possível excluir usuários da API de teste (JSONPlaceholder). Tente excluir um contato criado por você.',
        buttons: ['OK'],
      });
      await info.present();
    }
  }

  editar(user: any) {
    if (user.id && typeof user.id === 'string') {
      this.editData = {
        id: user.id,
        nome: user.nome || user.name || '',
        email: user.email || '',
        telefone: user.telefone || '',
      };
      this.isEditOpen = true;
    } else {
      this.alertCtrl
        .create({
          header: 'Atenção',
          message:
            'Não é possível editar usuários da API de teste (JSONPlaceholder).',
          buttons: ['OK'],
        })
        .then((a) => a.present());
    }
  }

  fecharEdicao() {
    this.isEditOpen = false;
  }

  salvarEdicao() {
    const payload = {
      id: this.editData.id,
      nome: (this.editData.nome || '').trim(),
      email: (this.editData.email || '').trim(),
      telefone: (this.editData.telefone || '').trim(),
    };
    this.firebaseService
      .updateContato(payload)
      .then(() => {
        // Atualiza localmente para refletir imediatamente
        this.users = this.users.map((u) =>
          u.id === payload.id ? { ...u, ...payload, source: 'firebase' } : u
        );
        this.isEditOpen = false;
      })
      .catch((err) => console.error(err));
  }
}
