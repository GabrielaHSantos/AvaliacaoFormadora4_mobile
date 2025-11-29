import { Injectable } from '@angular/core';
import { Observable, from, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = getFirestore();

  addContato(contact: any) {
    const contactsRef = collection(this.firestore, 'contacts');
    return addDoc(contactsRef, contact);
  }

  getContatos(): Observable<any[]> {
    const contactsRef = collection(this.firestore, 'contacts');
    return timer(0, 10000).pipe(
      switchMap(() => from(getDocs(contactsRef))),
      map((snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() } as any)))
    );
  }

  deleteContato(id: string) {
    const contactDocRef = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDocRef);
  }

  updateContato(contact: any) {
    const contactDocRef = doc(this.firestore, `contacts/${contact.id}`);
    return updateDoc(contactDocRef, {
      nome: contact.nome,
      email: contact.email,
      telefone: contact.telefone,
    });
  }
}
