import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Router } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { RegisterComponent } from './register/register.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PlaceDetailsComponent } from './map/place-details/place-details.component';
import { WebApiObservableService } from './shared/web-api-obserable.service';
import { AuthService } from './shared/auth.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    RegisterComponent,
    PlaceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAULrtLKbtbVG5vBESqFyJTqE0F_Ykb7xs'
    })
  ],
  providers: [{
    provide: AuthService,
    useClass: AuthService,
    deps: [WebApiObservableService]
  }, {
    provide: WebApiObservableService,
    useClass: WebApiObservableService,
    deps: [HttpClient]
  },
{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: TokenInterceptor,
//   multi: true
// },
