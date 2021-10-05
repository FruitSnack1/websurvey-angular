import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router) {}

  users: object;
  invalid = false;
  user = {
    id: "Vyberte uživatele",
    password: "",
  };

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loginUser() {
    this.userService.loginUser(this.user).subscribe((data: any) => {
      const { message, username, accessToken } = data;
      if(message == 'wrong password'){
        this.invalid = true
        setTimeout(()=>{
          this.invalid = false
        },3000)
        return
      }
      localStorage.setItem("username", username);
      localStorage.setItem("accessToken", accessToken);
      this.router.navigateByUrl("/admin");
    });
  }
}
