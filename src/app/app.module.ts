import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nPath } from './conf/i18n-path';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { SystemsModule } from '@systems/systems.module';
import { HeaderModule } from '@pages/layout/header/header.module';
import { MenuModule } from '@pages/layout/menu/menu.module';
import { FooterModule } from '@pages/layout/footer/footer.module';

import { AppComponent } from './app.component';
import { SystemParameterServiceModule } from '@systems/system/system-parameter/system-parameter.service.module';
import { LoadingModule } from '@pages/layout/loading/loading.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, I18nPath);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingModule,
    SystemsModule,
    HeaderModule,
    MenuModule,
    FooterModule,
    SystemParameterServiceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
