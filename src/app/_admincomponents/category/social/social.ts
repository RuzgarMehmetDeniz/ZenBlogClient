import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ekledik
import { SocialDto } from '../../../_models/socialDto';
import { SocialService } from '../../../_services/social-service';
import { AuthService } from '../../../_services/auth-service';
import { SweetalertService } from '../../../_services/sweetalert-service';

declare const alertify: any;

@Component({
  selector: 'app-social',
  standalone: false,
  templateUrl: './social.html',
  styleUrl: './social.css'
})
export class Social implements OnInit {
  socials: SocialDto[] = []; // Tanımlamayı boş diziyle güvene aldık
  newSocial: SocialDto = new SocialDto();
  editSocial: any = {};
  errors: any = [];

  constructor(
    private socialService: SocialService,
    private authService: AuthService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef // 2. constructor'a inject ettik
  ) {}

  ngOnInit(): void {
    this.getSocials();
  }

  getSocials() {
    this.socialService.getAll().subscribe({
      next: result => {
        this.socials = result.data;
        this.cdr.detectChanges(); // 3. Sosyal medya verileri gelince sayfayı tetikle
      },
      error: result => alertify.error("An Error Occured!")
    })
  }

  create() {
    this.errors = {};
    this.socialService.create(this.newSocial).subscribe({
      next: result => {
        this.socials.push(result.data);
        this.cdr.detectChanges();
      },
      error: result => {
        alertify.error("An Error Occured!");
        console.log(result.error.errors);
        this.errors = result.error.errors;
        this.cdr.detectChanges(); // Hata mesajları ekrana yansısın diye tetikle
      },
      complete: () => {
        alertify.success("Social Created!");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      }
    })
  }

  onSelected(model: any) {
    this.errors = {};
    this.editSocial = model;
    this.cdr.detectChanges(); // Güncelleme modali açılıp veriler dolsun diye tetikle
  }

  update() {
    this.socialService.update(this.editSocial).subscribe({
      error: result => {
        alertify.error("An Error Occured!");
        this.errors = result.error.errors;
        this.cdr.detectChanges();
      },
      complete: () => {
        alertify.success("Social Updated!");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      }
    })
  }

  async delete(id: any) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.socialService.delete(id).subscribe({
        error: result => alertify.error("An Error Occured!"),
        complete: () => {
          alertify.success("Social Deleted!");
          this.getSocials(); // Kendi içindeki detectChanges çalışacak
        }
      })
    } else {
      console.log("Delete Reverted")
    }
  }
}
