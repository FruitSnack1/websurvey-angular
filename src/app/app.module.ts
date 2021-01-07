import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./components/admin/admin.component";
import { AnketyComponent } from "./components/ankety/ankety.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PlayComponent } from "./components/play/play.component";
import { FormAnketaComponent } from "./components/form-anketa/form-anketa.component";
import { AnketaDetailComponent } from "./components/anketa-detail/anketa-detail.component";
import { QuestionComponent } from "./components/question/question.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";
import { PlayRegisterComponent } from "./components/play-register/play-register.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormOpenSurveyComponent } from "./components/form-open-survey/form-open-survey.component";
import { OpenQuestionComponent } from "./components/open-question/open-question.component";
import { AuthGuard } from "./auth.guard";
import { SettingsComponent } from './components/settings/settings.component';

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
    PlayRegisterComponent,
    MenuComponent,
    FormOpenSurveyComponent,
    OpenQuestionComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
