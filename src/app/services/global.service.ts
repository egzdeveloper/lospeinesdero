import { Injectable } from '@angular/core';
import { Category } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  categories: Category[];

  constructor() {
    this.categories = [
      { name: 'Tintes Inebrya' },
      { name: 'Tintes Alcántara' },
      { name: 'Oxidante Inebrya' },
      { name: 'Oxidante Alcántara' },
      { name: 'Decoloración' },
      { name: 'Mascarillas de color' },
      { name: 'Ampollas tratamiento' },
      { name: 'Champús' },
      { name: 'Mascarillas' },
      { name: 'Lacas' },
      { name: 'Espumas' },
      { name: 'Productos Curlys' },
      { name: 'Productos finalizado' },
      { name: 'Kits Permanentes' },
      { name: 'Kits Alisado' },
      { name: 'Papel de Mechas' },
      { name: 'Guantes' },
      { name: 'Otros' }
    ];
  }
}
