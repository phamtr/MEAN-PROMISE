import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  messageClass;
  message;
  newPost=false;
  loadingBlogs = false;
  form;
  processing = false;
  username;
  blogPosts;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {
    this.createNewBlogForm();
   }

createNewBlogForm(){
  this.form = this.formBuilder.group({
    title:['', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(5),
      this.alphaNumericValidation
    ])],
    body:['', Validators.compose([
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(5),
    ])]
  })
}

disableFormNewBlogForm(){
  this.form.get('title').disable();
  this.form.get('body').disable();
}
enableFormNewBlogForm(){
  this.form.get('title').enable();
  this.form.get('body').enable();
}
alphaNumericValidation(controls){

  const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
  if(regExp.test(controls.value)){
    return null;
  }else{
    return { 'alphaNumericValidation': true}
  }
}

  newBlogForm(){
    this.newPost = true;
  }
  reloadBlogs(){
    this.loadingBlogs = true;
    //Get All Blogs
    setTimeout(() =>{
      this.loadingBlogs = false;
    }, 4000);
  }
  draftComment(){
    
  }

  onBlogSubmit(){
   this.processing = true;
   this.disableFormNewBlogForm();
   const blog = {
     title: this.form.get('title').value,
     body: this.form.get('body').value,
     createdBy: this.username
   }
   this.blogService.newBlog(blog).subscribe(data =>{
     if(!data.success){
       this.messageClass = 'alert alert-danger';
       this.message = data.message;
       this.processing =false;
       this.enableFormNewBlogForm();
     }else{
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.getAllBlogs();
    
     setTimeout(() =>{
        this.newPost = false;
        this.processing =false;
      this.enableFormNewBlogForm();
      this.form.reset();
     }, 2000)
     }
   });
  }
  goBack(){
    window.location.reload();
  }
  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.username =  this.username = profile.user.username;
    });
    this.getAllBlogs();
  }

}
