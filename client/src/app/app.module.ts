import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { BlogService } from './blog.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './auth.guard';
import { ProductService } from './product.service';
import { NotAuthGuard } from './notAuth.guard';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { LogincompanyComponent } from './logincompany/logincompany.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent,
    LogincompanyComponent,
    UserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, BlogService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
