import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersComponent } from '../users/users.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  profileForm = this.fb.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    avatar: [''],
  });

  title: string = '';
  url: any;
  msg = '';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Employee
  ) {
    this.title = data.id != null ? 'Edit employee' : 'Add employee';
    this.url = data.avatar;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: this.data.id ? this.data.id : '',
      firstName: this.data.first_name ? this.data.first_name : '',
      lastName: this.data.last_name ? this.data.last_name : '',
      email: this.data.email ? this.data.email : '',
      avatar: this.data.avatar ? this.data.avatar : '',
    });
  }

  submit() {
    this.profileForm.value.avatar = this.url;
    this.dialogRef.close(this.profileForm.value);
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
