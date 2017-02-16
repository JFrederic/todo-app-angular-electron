import { NgModule,Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { AppComponent }  from './app.component';
import { TasksComponent } from './tasks.component';


@Injectable()


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Angular2FontawesomeModule,
 

  ],
  declarations: [
    AppComponent,
    TasksComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }