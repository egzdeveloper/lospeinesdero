import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  public principal = [
    { title: 'Inicio', url: 'dashboard', icon: 'home' },
    { title: 'Calendario', url: 'calendar', icon: 'calendar-number' },
    { title: 'Añadir Cita', url: 'add', icon: 'add-circle' },
    { title: 'Inventario', url: 'inventory', icon: 'list' }
  ];

  public editar = [
    { title: 'Servicios', url: 'services', icon: 'pricetags' },
    { title: 'Clientes', url: 'customers', icon: 'people' }
  ];

  public finanzas = [
    { title: 'Facturación', url: 'billing', icon: 'receipt' }
  ];

  public configuracion = [
    { title: 'Configuración', url: 'settings', icon: 'settings' }
  ];

  constructor() { }

  logout() {

  }

}
