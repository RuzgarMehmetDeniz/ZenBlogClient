import { Component, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ekledik
import { CommentService } from '../../../_services/comment-service';
import { SweetalertService } from '../../../_services/sweetalert-service';
import { CommentDto } from '../../../_models/commentDto';

declare const alertify: any;

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class CommentComponent {

  constructor(
    private commentService: CommentService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef // 2. constructor'a inject ettik
  ) {
    this.getcomments();
  }

  comments: CommentDto[] = [];
  newComment: CommentDto = new CommentDto();
  editComment: any = {};
  errors: any = [];

  getcomments() {
    this.commentService.getAll().subscribe({
      next: result => {
        this.comments = result.data;
        this.cdr.detectChanges(); // 3. Yorumlar yüklenince sayfayı zorla yenile
      },
      error: result => console.log(result.errors)
    });
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.commentService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Comment Deleted!");
          this.getcomments(); // Bu metot zaten içinde detectChanges() barındırıyor
        }
      });
    } else {
      console.log("Delete Reverted");
    }
  }
}
