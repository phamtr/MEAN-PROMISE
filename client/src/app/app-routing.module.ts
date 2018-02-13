import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { NotAuthGuard } from './notAuth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
   { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]  },
   { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
   { path: 'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard] },
   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent }
    
  ];

@NgModule({
    declarations: [
    
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
          ),
          CommonModule
    ],
    providers: [AuthGuard, NotAuthGuard],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }