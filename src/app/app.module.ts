import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnrolleeListComponent } from './component/enrolle-list/enrollee-list.component';
import { EditEnrolleeComponent } from './component/edit-enrollee/edit-enrollee.component';

@NgModule({
  declarations: [
    AppComponent,
    EnrolleeListComponent,
    EditEnrolleeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
