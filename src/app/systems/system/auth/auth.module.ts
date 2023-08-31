import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AutoLogoutModule } from '@template/msg/auto-logout/auto-logout.module';
import { LogoutService } from '@pages/login/shared/logout.service';
import { SPEC02010201ApiService } from '@api/spec02/spec02010201/spec02010201-api.service';


@NgModule({
  imports: [
    CommonModule,
    AutoLogoutModule
  ],
  providers: [
    AuthService,
    LogoutService,
    SPEC02010201ApiService
  ]
})
export class AuthModule { }
