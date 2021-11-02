import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './components/form/form.component';
import { SuccessComponent } from './components/success/success.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SuccessComponent,
    HeaderComponent,
    ErrorModalComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
