import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

interface Prova {
  nome: string,
  data?: Date,
}

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  // templateUrl: './app.material.component.html',
  // styleUrls: ['./app.material.component.scss']
  templateUrl: './app.material2.component.html',
  styleUrls: ['./app.material2.component.scss']
})
export class AppComponent {
  title = 'estudator';

  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;

  constructor(private db: AngularFirestore, 
              private changeDetectionRef: ChangeDetectorRef,
              private media: MediaMatcher) {

    this.viewportMobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => this.changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this._viewportQueryListener);
  }

  provasCollection: AngularFirestoreCollection<Prova>;
  provasObservable: Observable<Prova[]>

  ngOnInit() {
    this.provasCollection = this.db.collection('provas', c => c.orderBy('data').limit(3));
    this.provasObservable = this.provasCollection.valueChanges();
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }
}
