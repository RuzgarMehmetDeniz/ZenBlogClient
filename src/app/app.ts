import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ZenBlogClient');

blogs: any[]= ["Blog 1", "Blog 2", "Blog 3"];


getBlogs() {
return this.blogs;
}


}
