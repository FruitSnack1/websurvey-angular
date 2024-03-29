import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/pages/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import { AdminComponent } from "./components/pages/admin/admin.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { AnketyComponent } from "./components/pages/ankety/ankety.component";
import { PlayComponent } from "./components/pages/play/play.component";
import { FormAnketaComponent } from "./components/pages/form-anketa/form-anketa.component";
import { AnketaDetailComponent } from "./components/pages/anketa-detail/anketa-detail.component";
import { FormOpenSurveyComponent } from "./components/pages/form-open-survey/form-open-survey.component";
import { AuthGuard } from "./auth/auth.guard";
import { SettingsComponent } from "./components/pages/settings/settings.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { ConsoleComponent } from "./components/pages/console/console.component";
import { LogsComponent } from "./components/pages/logs/logs.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "console", component: ConsoleComponent },
  { path: "logs", component: LogsComponent },
  { path: "play/:id", component: PlayComponent },
  { path: "preview/:id", component: PlayComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: AnketyComponent },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: "ankety", component: AnketyComponent, canActivate: [AuthGuard] },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ankety/new",
        component: AnketyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "create",
        component: FormAnketaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "create2",
        component: FormOpenSurveyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detail/:id",
        component: AnketaDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit/:id/1",
        component: FormAnketaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit/:id/2",
        component: FormOpenSurveyComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
