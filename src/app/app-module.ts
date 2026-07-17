import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { MainLayout } from './_layouts/main-layout/main-layout';
import { Home } from './_main-components/home/home';
import { Category } from './_admincomponents/category/category';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Blog } from './_admincomponents/category/blog/blog';
import { Login } from './_main-components/home/login/login';
import { CommentComponent } from './_admincomponents/category/comment/comment';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guards/auth-guard';
import { Blogdetails } from './_main-components/home/blogdetails/blogdetails';
import { CommentForm } from './_main-components/home/comment-form/comment-form';
import { ContactMain } from './_main-components/home/contact-main/contact-main';
import { ContactInfo } from './_admincomponents/category/contact-info/contact-info';
import { TokenInterceptor } from './_interceptors/token-interceptor';
import { Message } from './_admincomponents/category/message/message';
import { Social } from './_admincomponents/category/social/social';
import { SendMessage } from './_main-components/home/send-message/send-message';

@NgModule({
  declarations: [
    App,
    AdminLayout,
    MainLayout,
    Home,
    Category,
    Blog,
    Login,
    Blogdetails,
    CommentForm,
    ContactMain,
    CommentComponent,
    ContactInfo,
    Message,
    Social,
    SendMessage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
