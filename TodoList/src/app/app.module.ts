import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http"
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {
  MatButtonModule,  MatDialogModule, MatInputModule, MatTableModule,
 MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';

import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { WavesModule, ButtonsModule, CardsModule, InputsModule } from 'angular-bootstrap-md'
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,MatRadioModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MDBBootstrapModule.forRoot(),
    WavesModule, ButtonsModule, CardsModule, InputsModule,HttpModule,MatToolbarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
