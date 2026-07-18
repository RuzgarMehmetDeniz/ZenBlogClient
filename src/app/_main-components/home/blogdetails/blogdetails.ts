import { Component } from '@angular/core';
import { BlogService } from '../../../_services/blog-service';
import { ActivatedRoute } from '@angular/router';
import { BlogDto } from '../../../_models/blog';
import { CommentDto } from '../../../_models/commentDto';

@Component({
  selector: 'app-blogdetails',
  standalone: false,
  templateUrl: './blogdetails.html',
  styleUrl: './blogdetails.css'
})
export class Blogdetails {
  blog?: BlogDto;               // undefined olabilir, açıkça belirt
  latestBlogs: BlogDto[] = [];  // boş dizi ile başlat (undefined değil!)
  newComment: CommentDto = new CommentDto();

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.getBlogById();
    this.getLatestBlogs();
  }

getBlogById() {
  const id = this.route.snapshot.params["id"];
  console.log('Route id:', id);

  this.blogService.getBlogById(id).subscribe({
    next: result => {
      console.log('API result RAW:', JSON.stringify(result, null, 2)); // <-- bunu ekle
      this.blog = result.data;
      console.log('this.blog:', this.blog); // <-- bunu da ekle
    },
    error: err => console.error('API error:', err)
  });
}

  getLatestBlogs() {
    this.blogService.getLatest5Blogs().subscribe({
      next: result => this.latestBlogs = result.data
    });
  }

  postComment() {
    this.newComment.blogId = this.route.snapshot.params["id"];
  }
}
