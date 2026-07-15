import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { MainLayout } from './_layouts/main-layout/main-layout';

import { Home } from './_main-components/home/home';
import { Login } from './_main-components/home/login/login';
import { Blogdetails } from './_main-components/home/blogdetails/blogdetails';
import { CommentForm } from './_main-components/home/comment-form/comment-form';
import { ContactMain } from './_main-components/home/contact-main/contact-main';
import { SendMessage } from './_main-components/home/send-message/send-message';

import { Category } from './_admincomponents/category/category';
import { Blog } from './_admincomponents/category/blog/blog';
import { CommentComponent } from './_admincomponents/category/comment/comment';
import { ContactInfo } from './_admincomponents/category/contact-info/contact-info';
import { Social } from './_admincomponents/category/social/social';
import { Message } from './_admincomponents/category/message/message';

import { TokenInterceptor } from './_interceptors/token-interceptor';

@NgModule({
  declarations: [
    App,
    AdminLayout,
    MainLayout,
    Home,
    Login,
    Blogdetails,
    CommentForm,
    ContactMain,
    SendMessage,
    Category,
    Blog,
    CommentComponent,
    ContactInfo,
    Social,
    Message
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
  bootstrap: [App],
})
export class AppModule {}
