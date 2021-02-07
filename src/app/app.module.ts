import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./components/pages/admin/admin.component";
import { AnketyComponent } from "./components/pages/ankety/ankety.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { PlayComponent } from "./components/pages/play/play.component";
import { FormAnketaComponent } from "./components/pages/form-anketa/form-anketa.component";
import { AnketaDetailComponent } from "./components/pages/anketa-detail/anketa-detail.component";
import { ResultQuestionSingleComponent } from "./components/result-questions/result-question-single/result-question-single.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";
import { PlayRegisterComponent } from "./components/play-register/play-register.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormOpenSurveyComponent } from "./components/pages/form-open-survey/form-open-survey.component";
import { ResultQuestionOpenComponent } from "./components/result-questions/result-question-open/result-question-open.component";
import { AuthGuard } from "./auth.guard";
import { SettingsComponent } from "./components/pages/settings/settings.component";
import { FormUserDataComponent } from "./components/form-user-data/form-user-data.component";
import { FormQuestionSingleComponent } from "./components/form-questions/form-question-single/form-question-single.component";
import { PlayQuestionSingleComponent } from "./components/play-questions/play-question-single/play-question-single.component";

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
    ResultQuestionSingleComponent,
    PlayRegisterComponent,
    MenuComponent,
    FormOpenSurveyComponent,
    ResultQuestionOpenComponent,
    SettingsComponent,
    FormUserDataComponent,
    FormQuestionSingleComponent,
    PlayQuestionSingleComponent,
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
