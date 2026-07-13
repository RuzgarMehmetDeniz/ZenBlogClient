import { Component, signal } from '@angular/core';
import { Blog } from './_models/blog';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ZenBlogClient');

blogs: Blog[]= [
  { id: 1, title: 'Blog 1', description: 'Description 1' },
  { id: 2, title: 'Blog 2', description: 'Description 2' },
  { id: 3, title: 'Blog 3', description: 'Description 3' },
    { id: 4, title: 'Blog 4', description: 'Description 4' },
  { id: 5, title: 'Blog 5', description: 'Description 5' },

];

getBlogs() {
return this.blogs;
}


}
