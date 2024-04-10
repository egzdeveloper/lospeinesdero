import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MbscCalendarEvent, Notifications } from '@mobiscroll/angular';
import { DatesService } from 'src/app/services/dates.service';

import * as moment from 'moment';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  date: MbscCalendarEvent;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    observations: new FormControl(''),
    color: new FormControl('', Validators.required),
  });

  id: string | null;
  title: string = 'Añadir';

  constructor(
    private datesService: DatesService,
    private router: Router,
    private notify: Notifications,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    if (this.id) {
      this.title = 'Gestionar';
      await this.datesService.getDatewithID(this.id).subscribe((res) => {
        this.form.setValue({
          name: res.name,
          service: res.title,
          price: res.price,
          start: res.start,
          end: res.end,
          observations: res.observations,
          color: res.color,
        });
      });
    }
  }

  submit() {
    let id;
    if (this.id) id = this.id;
    else id = new Date().toISOString();

    this.date = {
      name: this.form.value.name!,
      id: id,
      day: moment(this.form.value.start, 'YYYY-MM-DD[T]hh:mm').format(
        'YYYY/MM/DD'
      ),
      title: this.form.value.service!,
      start: this.form.value.start!,
      end: this.form.value.end!,
      price: this.form.value.price!,
      observations: this.form.value.observations!,
      color: this.form.value.color!,
    };

    try {
      if (this.id) {
        this.datesService.editDate(this.date);
      } else {
        this.datesService.addDate(this.date);
      }
      this.notify.toast({
        message: 'Cita guardada correctamente',
        color: 'success',
      });
      this.form.reset();
      this.router.navigateByUrl('/calendar');
    } catch (e) {
      this.notify.toast({
        message: 'Se ha producido un error',
        color: 'danger',
      });
    }
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'Eliminar Cita',
      message: 'Esta acción es irreversible. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.datesService.deleteDate(this.id!.toString());
            this.notify.toast({
              message: 'Cita eliminada correctamente',
              color: 'warning',
            });
            this.router.navigateByUrl('/calendar');
            this.form.reset();
          },
        },
      ],
    });

    await alert.present();
  }

  goBack() {
    this.router.navigateByUrl('/calendar');
  }
}
