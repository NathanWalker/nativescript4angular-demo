// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppComponent } from "./app.component";
import { ComponentsModule, routes } from './components/components.module';
import { APP_PROVIDERS, firebaseReducer, FirebaseEffects } from './services/index';

@NgModule({
  imports: [
    ComponentsModule,
    StoreModule.provideStore({
      list: firebaseReducer
    }),
    EffectsModule.run(FirebaseEffects),
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);