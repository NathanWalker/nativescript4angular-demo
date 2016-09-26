import {Injectable, NgZone} from '@angular/core';
var firebase = require('nativescript-plugin-firebase');

import {Store, Action, ActionReducer} from '@ngrx/store';
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {orderBy} from 'lodash';

const CATEGORY: string = 'Firebase';

export interface IFirebaseState {
  items: Array<any>
}

const initialState: IFirebaseState = {
  items: []
};

interface IFIREBASE_ACTIONS {
  ADD: string;
  SYNC_UPDATE: string;
}

export const FIREBASE_ACTIONS: IFIREBASE_ACTIONS = {
  ADD: `${CATEGORY}_ADD`,
  SYNC_UPDATE: `${CATEGORY}_SYNC_UPDATE`
};

export const firebaseReducer: ActionReducer<IFirebaseState> = (state: IFirebaseState = initialState, action: Action) => {
  switch (action.type) {
    case FIREBASE_ACTIONS.SYNC_UPDATE:
      return { items: action.payload };
    default:
      return state;
  }
};

@Injectable() 
export class FirebaseService {
  constructor(private store: Store<any>, private ngZone: NgZone) {
    firebase.init({
      persist: true
    }).then((instance) => {
      console.log("firebase.init done");
      this.initList();
    }, (error) => {
      console.log("firebase.init error: " + error);
    });
  }

  public add(item: any) {
    firebase.push(
      '/list',
      item
    ).then((result) => {
      console.log(result);
      for (let key in result) {
        console.log(`key: ${key}, ${result[key]}`);
      }
    })
  }

  private initList() {
    firebase.addValueEventListener(this.syncList.bind(this), '/list');
  }

  private syncList(result: any) {
    let results = [];
    if (result.value) {
      for (let key in result.value) {
        results.push(Object.assign({}, {id: key}, result.value[key]));
      }
    }
    results = orderBy(results, ['title'], ['asc']);
    this.ngZone.run(() => {
      this.store.dispatch({ type: FIREBASE_ACTIONS.SYNC_UPDATE, payload: results });
    });
  }
}

@Injectable()
export class FirebaseEffects {

  constructor(private store: Store<any>, private actions$: Actions, private firebaseService: FirebaseService) { }

  @Effect() add$ = this.actions$
    .ofType(FIREBASE_ACTIONS.ADD)
    .do((action) => {
      this.firebaseService.add(action.payload);
    })
    .filter(() => false);

}