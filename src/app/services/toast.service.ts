import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    color: string,
    duration: number,
    icon: string
  ) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      color: color,
      duration: duration,
      icon: icon,
      mode: 'ios'
    });

    await toast.present();
  }
}
