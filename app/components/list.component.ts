import {Component} from "@angular/core";
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {FIREBASE_ACTIONS} from '../services/index';

@Component({
  moduleId: module.id,
  selector: "list",
  templateUrl: "list.component.html",
})
export class ListComponent {
  // public items: Array<any> = [
  //   {
  //     title: 'Item'
  //   },
  //   {
  //     title: 'Item 2'
  //   }
  // ];
  public list$: Observable<any>;

  constructor(private store: Store<any>) {

  }

  public add() {
    this.store.take(1).subscribe((state: any) => {
      this.store.dispatch({
        type: FIREBASE_ACTIONS.ADD, payload: {
          title: `Title ${state.list.items.length+1}`
        }
      });
    })
  }

  ngOnInit() {
    this.list$ = this.store.select('list');
  }
}
