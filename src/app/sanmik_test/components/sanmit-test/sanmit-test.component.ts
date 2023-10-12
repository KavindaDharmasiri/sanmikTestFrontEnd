import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from '../../service/user.service';
import {UserModule} from '../../modules/user/user.module';
import Swal from "sweetalert2";

@Component({
  selector: 'app-sanmit-test',
  templateUrl: './sanmit-test.component.html',
  styleUrls: ['./sanmit-test.component.css']
})
export class SanmitTestComponent implements OnInit {
  data: UserModule[];
  userModel: any = {};
  newData: any = {};
  sanmikForm: FormGroup;
  submittedForm1: boolean=false;
  usM: UserModule;
  isDisabled: boolean=false;

  constructor(private formBuilder: FormBuilder,private userService: UserService,) {
    this.sanmikForm = this.formBuilder.group({
      id: [{ value: '', disabled: this.isDisabled }, [Validators.required,this.numberValidator]],
      name: [false, [Validators.required]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    });
  }

  numberValidator(control) {
    const value = control.value;
    if (value && isNaN(value)) {
      return { 'notANumber': true };
    }
    return null;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe(res => {
        this.data = res.data;
      });
  }

  openAddModal() {
    this.resetForm();
    this.isDisabled = false;
    const idControl = this.sanmikForm.get('id');

    if (this.isDisabled) {
      idControl.disable();
    } else {
      idControl.enable();
    }
    document.getElementById('addModal').style.display = 'block';
  }

  addNewData() {
    this.submittedForm1 = true;
    if (this.sanmikForm.valid){
      this.userModel.id = this.sanmikForm.get('id').value;
      this.userModel.name = this.sanmikForm.get('name').value;
      this.userModel.address = this.sanmikForm.get('address').value;
      this.userModel.age = this.sanmikForm.get('age').value;
      this.userModel.contact = this.sanmikForm.get('contact').value;

      this.userService.postUser(this.userModel).subscribe(result => {
        console.log(result);
        if (result) {
          Swal.fire('Data saving Success!', "Saved", 'success');
          document.getElementById('addModal').style.display = 'none';
          this.getAllUsers();
          this.resetForm();
        } else {
          Swal.fire('Data saving Error!', "not saved check again", 'error');
        }
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'An error occurred while saving the data.', 'error');
      }
      );

    }
  }

  resetForm(){
    this.sanmikForm.reset();
    this.newData = {};
  }

  editData(i) {
    this.resetForm();
    this.isDisabled = true;
    const idControl = this.sanmikForm.get('id');

    if (this.isDisabled) {
      idControl.disable();
    } else {
      idControl.enable();
    }

    document.getElementById('addModal').style.display = 'block';
    this.newData.id = i.id;
    this.newData.name = i.name;
    this.newData.address = i.address;
    this.newData.age = i.age;
    this.newData.contact = i.contact;
  }

  deleteData(i) {
    console.log(i);
    Swal.fire({
      title: 'Delete User?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(i.id).subscribe(
          res => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            this.getAllUsers();
          },
          (error) => {
            Swal.fire('Error!', 'The user has not been deleted.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The item was not deleted.', 'error');
      }
    });
  }

  closeModal() {
    document.getElementById('addModal').style.display = 'none';
  }
}
