import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { AgGridModule } from 'ag-grid-angular';
import { DialogComponent } from './shared/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, HelloComponent, UsersComponent, DialogComponent],
  bootstrap: [AppComponent],
  providers: [UsersService],
  entryComponents: [DialogComponent],
})
export class AppModule {}
