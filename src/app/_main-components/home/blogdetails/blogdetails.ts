import { Component, signal } from '@angular/core';
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
  blog = signal<BlogDto | undefined>(undefined);
  latestBlogs = signal<BlogDto[]>([]);
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
    this.blogService.getBlogById(id).subscribe({
      next: result => this.blog.set(result.data),
      error: err => console.error('Blog getirilirken hata:', err)
    });
  }

  getLatestBlogs() {
    this.blogService.getLatest5Blogs().subscribe({
      next: result => this.latestBlogs.set(result.data),
      error: err => console.error('Son bloglar getirilirken hata:', err)
    });
  }

  postComment() {
    const currentBlog = this.blog();
    if (currentBlog) {
      this.newComment.blogId = currentBlog.id;
    }
  }
}
