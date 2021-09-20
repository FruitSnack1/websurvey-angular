import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
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
import { AuthGuard } from "./auth/auth.guard";
import { SettingsComponent } from "./components/pages/settings/settings.component";
import { FormUserDataComponent } from "./components/form-user-data/form-user-data.component";
import { FormQuestionSingleComponent } from "./components/form-questions/form-question-single/form-question-single.component";
import { PlayQuestionSingleComponent } from "./components/play-questions/play-question-single/play-question-single.component";
import { FormQuestionOpenComponent } from "./components/form-questions/form-question-open/form-question-open.component";
import { PlayQuestionOpenComponent } from "./components/play-questions/play-question-open/play-question-open.component";
import { JwtInterceptor } from "./auth/jwt.interceptor";
import { FormQuestionScaleComponent } from './components/form-questions/form-question-scale/form-question-scale.component';
import { PlayQuestionScaleComponent } from './components/play-questions/play-question-scale/play-question-scale.component';
import { ResultQuestionScaleComponent } from './components/result-questions/result-question-scale/result-question-scale.component';
import { ChartBarComponent } from './components/charts/chart-bar/chart-bar.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ResultUsersComponent } from './components/result-questions/result-users/result-users.component';
import { ConsoleComponent } from './components/pages/console/console.component';

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
    FormQuestionOpenComponent,
    PlayQuestionOpenComponent,
    FormQuestionScaleComponent,
    PlayQuestionScaleComponent,
    ResultQuestionScaleComponent,
    ChartBarComponent,
    NotFoundComponent,
    ResultUsersComponent,
    ConsoleComponent,
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
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
