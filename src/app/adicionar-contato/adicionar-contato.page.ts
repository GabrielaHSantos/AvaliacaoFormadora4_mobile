import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdicionarContatoPage {
  // Variável para guardar os dados do formulário
  contato = {
    nome: '',
    email: '',
    telefone: ''
  };

  private firebaseService = inject(FirebaseService);
  private router = inject(Router);

  criarContato() {
    // Chama a função do serviço que criamos antes
    this.firebaseService.addContato(this.contato).then(() => {
      console.log('Contato salvo!');
      // Limpa o formulário e volta pra home
      this.contato = { nome: '', email: '', telefone: '' };
      this.router.navigate(['/listar-contatos']); 
    }).catch(erro => {
      console.error('Deu erro:', erro);
    });
  }
}
