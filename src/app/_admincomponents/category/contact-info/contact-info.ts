import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ekledik
import { ContactInfoDto } from '../../../_models/contactInfoDto';
import { ContactInfoService } from '../../../_services/contact-info-service';
import { AuthService } from '../../../_services/auth-service';
import { SweetalertService } from '../../../_services/sweetalert-service';

declare const alertify: any;

@Component({
  selector: 'app-contact-info',
  standalone: false,
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css'
})
export class ContactInfo implements OnInit {
  contactInfos: ContactInfoDto[] = []; // Tanımlamayı boş diziyle güvene aldık
  newContactInfo: ContactInfoDto = new ContactInfoDto();
  editContactInfo: any = {};
  errors: any = [];

  constructor(
    private contactInfoService: ContactInfoService,
    private authService: AuthService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef // 2. constructor'a inject ettik
  ) {}

  ngOnInit(): void {
    this.getcontactInfos();
  }

  getcontactInfos() {
    this.contactInfoService.getAll().subscribe({
      next: result => {
        this.contactInfos = result.data;
        this.cdr.detectChanges(); // 3. İletişim bilgileri gelince sayfayı tetikle
      },
      error: result => alertify.error("An Error Occured!")
    })
  }

  create() {
    this.errors = {};
    this.contactInfoService.create(this.newContactInfo).subscribe({
      next: result => {
        this.contactInfos.push(result.data);
        this.cdr.detectChanges();
      },
      error: result => {
        alertify.error("An Error Occured!");
        console.log(result.error.errors);
        this.errors = result.error.errors;
        this.cdr.detectChanges(); // Hata mesajları modalda görünsün diye tetikle
      },
      complete: () => {
        alertify.success("Contact Info Created!");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      }
    })
  }

  onSelected(model: any) {
    this.errors = {};
    this.editContactInfo = model;
    this.cdr.detectChanges(); // Güncelleme modali açılıp veriler dolsun diye tetikle
  }

  update() {
    this.contactInfoService.update(this.editContactInfo).subscribe({
      error: result => {
        alertify.error("An Error Occured!");
        this.errors = result.error.errors;
        this.cdr.detectChanges();
      },
      complete: () => {
        alertify.success("Contact Info Updated!");
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
      this.contactInfoService.delete(id).subscribe({
        error: result => alertify.error("An Error Occured!"),
        complete: () => {
          alertify.success("Contact Info Deleted!");
          this.getcontactInfos(); // Kendi içinde detectChanges tetikleyecek
        }
      })
    } else {
      console.log("Delete Reverted")
    }
  }
}
