import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, Database, DataSnapshot } from 'firebase/database';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: Database;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(app);
  }

  addContact(contact: any) {
    const contactsRef = ref(this.db, 'contacts');
    return push(contactsRef, contact);
  }

  getContacts(callback: (contacts: any[]) => void) {
    const contactsRef = ref(this.db, 'contacts');
    onValue(contactsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      const contacts: any[] = [];
      if (data) {
        Object.keys(data).forEach(key => {
          contacts.push({ id: key, ...data[key] });
        });
      }
      callback(contacts);
    });
  }
}
