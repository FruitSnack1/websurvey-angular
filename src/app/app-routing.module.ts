import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AdminComponent } from "./components/admin/admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AnketyComponent } from "./components/ankety/ankety.component";
import { PlayComponent } from "./components/play/play.component";
import { FormAnketaComponent } from "./components/form-anketa/form-anketa.component";
import { AnketaDetailComponent } from "./components/anketa-detail/anketa-detail.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormOpenSurveyComponent } from "./components/form-open-survey/form-open-survey.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: MenuComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "play/:id", component: PlayComponent },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", component: DashboardComponent },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: "ankety", component: AnketyComponent, canActivate: [AuthGuard] },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
