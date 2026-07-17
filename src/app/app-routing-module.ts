import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './_layouts/main-layout/main-layout';
import { Home } from './_main-components/home/home';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { Category } from './_admincomponents/category/category';
import { Blog } from './_admincomponents/category/blog/blog';
import { Login } from './_main-components/home/login/login';
import { AuthGuard } from './_guards/auth-guard';
import { Blogdetails } from './_main-components/home/blogdetails/blogdetails';
import { ContactMain } from './_main-components/home/contact-main/contact-main';
import { ContactInfo } from './_admincomponents/category/contact-info/contact-info';
import { Message } from './_admincomponents/category/message/message';
import { Social } from './_admincomponents/category/social/social';


const routes: Routes = [

//Main Routes

{ path:'', component: MainLayout,

  children: [
    {path:'', component:Home},
    {path:'login',component:Login},
    {path:'blogdetails/:id',component:Blogdetails},
    {path:'contact',component:ContactMain}
  ]
},



//Admin Routes    http://localhost:4200/admin/category

{path:'admin',
  component:AdminLayout,
  canActivate:[AuthGuard],
  children:[
    {path:'category',
      component:Category,
    canActivate:[AuthGuard]},
    {path:'blog',
       component:Blog,
      canActivate:[AuthGuard]},
       {path:'comment',
       component:Comment,
      canActivate:[AuthGuard]},
      {path:'contactinfo',
       component:ContactInfo,
      canActivate:[AuthGuard]},
       {path:'message',
       component:Message,
      canActivate:[AuthGuard]},
       {path:'social',
       component:Social,
      canActivate:[AuthGuard]}

  ]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
