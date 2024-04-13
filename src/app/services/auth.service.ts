import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private toastService: ToastService) { }

  async login(email: string, password: string) {
    try {
       return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      return this.toastService.presentToast('Hubo un error al iniciar sesión. Inténtalo de nuevo.', 'top', 'danger', 1500, 'close');
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  getActualUser() {
    return this.afAuth.authState.pipe(first());
  }
}
