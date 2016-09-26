import {Component} from "@angular/core";
import {ModalDialogService, ModalDialogOptions} from "nativescript-angular/directives/dialogs";
import {ModalComponent} from './modal.component';

@Component({
  moduleId: module.id,
  selector: "home",
  templateUrl: "home.component.html",
  providers: [ModalDialogService]
})
export class HomeComponent {
  public counter: number = 16;

  constructor(private modal: ModalDialogService) {

  }

  public get message(): string {
    if (this.counter > 0) {
      return this.counter + " taps left";
    } else {
      return "Hoorraaay! \nYou are ready to start building!";
    }
  }

  public onTap() {
    this.counter--;
  }

  public openModal() {
    let options: ModalDialogOptions = {
      context: { promptMsg: "This is the prompt message!" },
      fullscreen: true
    };
    this.modal.showModal(ModalComponent, options).then((res: string) => {
      console.log(res);
    });
  }
}
