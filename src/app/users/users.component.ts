import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog.component';
import { Employee, UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  employees = new Array<Employee>();
  private dialogRef: MatDialogRef<DialogComponent>;
  profileForm = this.fb.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    avatar: [''],
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: UsersService
  ) {
    this.loadData();
  }

  ngOnInit() {
    // this.profileForm = this.fb.group({
    //   id: this.data.id ? this.data.id : '',
    //   firstName: this.data.first_name ? this.data.first_name : '',
    //   lastName: this.data.last_name ? this.data.last_name : '',
    //   email: this.data.email ? this.data.email : '',
    //   avatar: this.data.avatar ? this.data.avatar : '',
    // });
  }

  loadData() {
    for (let i = 1; i <= 2; i++) {
      this.service.getUsers(i).subscribe((response) => {
        this.employees = this.employees.concat(
          response.data.map((item) => {
            return new Employee(
              item.id,
              item.first_name,
              item.last_name,
              item.email,
              item.avatar
            );
          })
        );
        console.log('employees', this.employees);
      });
    }
  }

  edit(result: Employee) {
    let employee: Employee | undefined;
    this.profileForm = this.fb.group({
      id: result.id ? result.id : '',
      firstName: result.first_name ? result.first_name : '',
      lastName: result.last_name ? result.last_name : '',
      email: result.email ? result.email : '',
      avatar: result.avatar ? result.avatar : '',
    });
    employee = this.employees.find((e) => e.id == result.id);
    if (employee != undefined) {
      employee.id = result.id;
      employee.email = result.email;
      employee.first_name = result.first_name;
      employee.last_name = result.last_name;
      employee.avatar = result.avatar;
    } else {
      let lastId: number =
        this.employees == null
          ? 0
          : this.employees[this.employees.length - 1].id;
      let newEmployee: Employee = new Employee(
        lastId + 1,
        result.first_name,
        result.last_name,
        result.email,
        result.avatar
      );
      this.employees.push(newEmployee);
    }
  }

  openDialog(employee?): void {
    console.log('before open dialog');
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',

      // hasBackdrop: false,
      // autoFocus: true,
      data: null,
      //  {
      //   name: employee.first_name + ' ' + employee.last_name,
      //   animal: employee.email,
      // },
    });

    // this.dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }
}
