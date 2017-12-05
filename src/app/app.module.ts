import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EqualityValidatorDirective } from './shared/equality-validator.directive';
import { PlaceDetailCardComponent } from './map/place-detail-card/place-detail-card.component';
import { IngredientRating } from './shared/ingredient-rating';
import { VotingLockService } from './shared/voting-lock.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInputModule, MatToolbarModule, MatProgressBarModule, MatListModule, MatChipsModule, MatDialogModule } from '@angular/material';
import { FoodSearchComponent } from './map/food-search/food-search.component';
import { DataService } from './shared/data.service';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    RegisterComponent,
    PlaceDetailsComponent,
    EqualityValidatorDirective,
    PlaceDetailCardComponent,
    FoodSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAULrtLKbtbVG5vBESqFyJTqE0F_Ykb7xs'
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule
  ],
  providers: [
    VotingLockService,
    AuthService,
    WebApiObservableService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
