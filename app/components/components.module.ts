import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { HomeComponent } from './home.component';
import { ListComponent } from './list.component';
import { ModalComponent } from './modal.component';

export const routes: Routes = [   
  { path: "", component: HomeComponent },
  { path: "list", component: ListComponent }
];

export const COMPONENTS: any[] = [
  HomeComponent,
  ListComponent
];

export const FACTORY_COMPONENTS: any[] = [
  ModalComponent
];

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    StoreModule
  ],
  entryComponents: [
    FACTORY_COMPONENTS
  ],
  declarations: [
    COMPONENTS,
    FACTORY_COMPONENTS
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    COMPONENTS,
    FACTORY_COMPONENTS
  ]
})
export class ComponentsModule {

}