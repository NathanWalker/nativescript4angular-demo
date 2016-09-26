import {Component} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";

@Component({
  moduleId: module.id,
  selector: "modal",
  templateUrl: "modal.component.html",
})
export class ModalComponent {

  constructor(private params: ModalDialogParams) {
    console.log(params.context.promptMsg);
  } 
  
  public close() {
    this.params.closeCallback('pass something back');
  }
}
