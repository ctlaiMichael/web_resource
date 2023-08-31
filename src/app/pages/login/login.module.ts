import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginService } from './shared/login.service';
import { SharedModule } from '@systems/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@template/msg/alert/alert.module';
import { ConfirmModule } from '@template/msg/confirm/confirm.module';
import { SPEC02010101ApiService } from '@api/spec02/spec02010101/spec02010101-api.service';
import { SPEC03020101ApiService } from '@api/spec03/spec03020101/spec03020101-api.service';
import { CheckIdService } from './shared/check-id.service';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    AlertModule,
    ConfirmModule,
    InputCtrlModule
  ],
  providers: [
    LoginService,
    CheckIdService,
    SPEC02010101ApiService,
    SPEC03020101ApiService
  ],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
