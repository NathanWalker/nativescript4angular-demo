import {Component} from "@angular/core";
import {FirebaseService} from './services/index';

import {registerElement} from
  "nativescript-angular/element-registry";
registerElement("Shimmer", () =>
  require("nativescript-shimmer").Shimmer);

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
})
export class AppComponent {

}
