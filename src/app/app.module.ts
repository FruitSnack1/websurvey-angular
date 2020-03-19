import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { AnketyComponent } from './components/ankety/ankety.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayComponent } from './components/play/play.component';
import { FormAnketaComponent } from './components/form-anketa/form-anketa.component';
import { AnketaDetailComponent } from './components/anketa-detail/anketa-detail.component';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AnketyComponent,
    DashboardComponent,
    PlayComponent,
    FormAnketaComponent,
    AnketaDetailComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
