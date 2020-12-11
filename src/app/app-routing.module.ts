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
      { path: "dashboard", component: DashboardComponent },
      { path: "ankety", component: AnketyComponent },
      { path: "ankety/new", component: AnketyComponent },
      { path: "create", component: FormAnketaComponent },
      { path: "create2", component: FormOpenSurveyComponent },
      { path: "detail/:id", component: AnketaDetailComponent },
      { path: "edit/:id", component: FormAnketaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
