import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Article } from '../models/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  mainCollection: AngularFirestoreCollection<any>;
  articlesDoc: AngularFirestoreDocument<any>;
  articlesCollection: AngularFirestoreCollection<Article>;
  articles: Observable<Article[]>;

  role: string;

  constructor(private db: AngularFirestore) {
    this.role = localStorage.getItem('role')!;
    this.loadData();
  }

  private loadData() {
    this.mainCollection = this.db.collection('lospeinesdero');
    this.articlesDoc = this.mainCollection.doc(this.role);
    this.articlesCollection = this.articlesDoc.collection('inventario');
    this.articles = this.articlesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Article;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }

  getArticles() {
    return this.articles;
  }

  getArticleWithID(id: string) {
    return this.db
      .collection<Article>('lospeinesdero')
      .doc(this.role)
      .collection('inventario')
      .doc(id)
      .valueChanges();
  }

  addArticle(date: Article) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('inventario')
      .doc(date.id?.toString())
      .set(date);
  }

  editArticle(date: Article) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('inventario')
      .doc(date.id?.toString())
      .update(date);
  }

  deleteArticle(id: string) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('inventario')
      .doc(id)
      .delete();
  }
}
