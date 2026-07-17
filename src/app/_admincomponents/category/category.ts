import { Component, ChangeDetectorRef } from '@angular/core'; // 1. ChangeDetectorRef ekledik
import { SweetalertService } from '../../_services/sweetalert-service';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';

declare const alertify: any;

@Component({
  selector: 'admin-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  constructor(
    private categoryService: CategoryService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef // 2. constructor'a inject ettik
  ) {
    this.getCategories();
  }

  categories: CategoryDto[] = [];
  newCategory: CategoryDto = new CategoryDto();
  editCategory: any = {};
  errors: any = [];

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: result => {
        this.categories = result.data;

        // 3. Veri başarıyla set edildikten sonra Angular'ı zorla tetikliyoruz:
        this.cdr.detectChanges();
      },
      error: result => {
        console.log(result.errors);
      }
    });
  }

  createCategory(){
      this.categoryService.create(this.newCategory).subscribe({
        next: result => this.categories.push(result.data),
        error: result =>{
            alertify.error("An Error Occured!");

            if(result.status===400){
              console.log(result.error.errors)
              this.errors= result.error.errors
            };
        } ,
        complete: () => {
          alertify.success("Category Created!");

         setTimeout(()=>{
          location.reload();
         }, 1000 )


        }
      })
  };

async delete(id){

const isConfirmed = await this.swal.areYouSure();


if(isConfirmed){
this.categoryService.delete(id).subscribe({
  error: result => {console.error(result.error);
    alertify.error("An Error Occured!")
  },
  complete: () => {alertify.success("Category Deleted!");
    this.getCategories();
  }
})

}
else{
  console.log("Delete Reverted")
}



};

update(){
this.categoryService.update(this.editCategory).subscribe({
  error: result => {
    alertify.error("An Error Occured!");

    if(result.status===400){
              console.log(result.error)
              this.errors= result.error.errors
            };
  },
  complete: () => {
    alertify.success("Category Updated!");

   setTimeout(()=>{
          location.reload();
         }, 1000 )
        }

})

};


onSelected(model:CategoryDto){
  this.editCategory= model;
}



}



