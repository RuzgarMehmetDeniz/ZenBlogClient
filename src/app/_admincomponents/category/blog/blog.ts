import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ekledik
import { BlogService } from '../../../_services/blog-service';
import { SweetalertService } from '../../../_services/sweetalert-service';
import { BlogDto } from '../../../_models/blog';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../_services/category-service';
import { CategoryDto } from '../../../_models/category';
import { AuthService } from '../../../_services/auth-service';

declare const alertify: any;

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  constructor(
    private blogService: BlogService,
    private swal: SweetalertService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // 2. constructor'a inject ettik
  ) {}

  blogs: BlogDto[] = [];
  categories: any = [];
  newBlog: BlogDto = new BlogDto();
  editBlog: any = {};
  errors: any = [];

  ngOnInit(): void {
    this.getBlogs();
    this.getCategories();
  }

 getBlogs() {
  this.blogService.getAll().subscribe({
    next: result => {
      this.blogs = result.data;
      console.log('Ham blog verisi:', JSON.stringify(this.blogs, null, 2));
      this.cdr.detectChanges();
    },
    error: result => alertify.error("An Error Occured!")
  })
}

  create() {
    this.errors = {};
    this.newBlog.userId = this.authService.getUserId();
    this.blogService.create(this.newBlog).subscribe({
      next: result => {
        this.blogs.push(result.data);
        this.cdr.detectChanges(); // Ekleme yapılınca da listeyi güncel tutalım
      },
      error: result => {
        alertify.error("An Error Occured!");
        console.log(result.error.errors);
        this.errors = result.error.errors;
        this.cdr.detectChanges(); // Hata mesajları ekrana düşsün diye tetikle
      },
      complete: () => {
        alertify.success("Blog Created!");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      }
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: result => {
        this.categories = result.data;
        this.cdr.detectChanges(); // 4. Kategori verileri gelince sayfayı tetikle
      }
    })
  }

  onSelected(blog: BlogDto) {
    this.errors = {};
    this.editBlog = blog;
    this.cdr.detectChanges(); // Modal açılıp veriler inputlara dolsun diye tetikle
  }

  update() {
    this.editBlog.userId = this.authService.getUserId();
    this.blogService.update(this.editBlog).subscribe({
      error: result => {
        alertify.error("An Error Occured!");
        this.errors = result.error.errors;
        this.cdr.detectChanges();
      },
      complete: () => {
        alertify.success("Blog Updated!");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      }
    })
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();
    if (isConfirmed) {
      this.blogService.delete(id).subscribe({
        error: result => alertify.error("An Error Occured!"),
        complete: () => {
          alertify.success("Blog Deleted!");
          this.getBlogs(); // Bu zaten kendi içinde detectChanges tetikliyor
        }
      })
    } else {
      console.log("Delete Reverted")
    }
  }
}
