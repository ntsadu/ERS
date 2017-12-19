import { Component, OnInit } from '@angular/core';
import { ERSController } from '../../providers/ers-controller/ers-controller';
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstname : string;
  lastname : string;
  email : string;
  username : string;
  password : string;

  selected : any;  
  registerOptions : any[] = [];

  userRoleTypes : any[] = [];

  constructor(public ersApp : ERSController, public router: Router) {
    this.ersApp.GetAllRoles()        
      .subscribe(
        (data: any) => {
            _.map(data, (r:any)=>{ this.registerOptions.push({id : r.userRoleId, value : r.userRoleName}); });
            this.selected = this.registerOptions[0].value; 
        },
        (error) => { }
      );
   }

  ngOnInit() {
  }

  updateFirstName(f : any){
    this.firstname = f;
  }

  updateLastName(l : any){
    this.lastname = l;
  }

  updateEmail(e : any){
    this.email = e;
  }

  updateUsername(u : any){
    this.username = u;
  }

  updatePassword(p : any){
    this.password = p;
  }

  register(){

    let $requestBody = <any>{};
    $requestBody.userRoleId = this.selected.id;
    $requestBody.firstName = this.firstname;
    $requestBody.lastName = this.lastname;
    $requestBody.email = this.email;
    $requestBody.username = this.username;
    $requestBody.password = this.password;

    _.map(this.registerOptions, (r) => { if(r.value == this.selected) $requestBody.userRoleId = r.id; });

    if(($requestBody.userRoleId != null && $requestBody.userRoleId != undefined) && 
      ($requestBody.firstName != null && $requestBody.firstName != undefined) && 
      ($requestBody.lastName != null && $requestBody.lastName != undefined) && 
      ($requestBody.email != null && $requestBody.email != undefined) && 
      ($requestBody.username != null && $requestBody.username != undefined) && 
      ($requestBody.password != null && $requestBody.password != undefined)){
        this.ersApp.addNewUser($requestBody)
        .subscribe(
          (data: any) => { this.router.navigate(["login"]); },
          (error) => { }
        );
    }
  }

  cancel(){
    this.router.navigate(["login"]);
  }
}
