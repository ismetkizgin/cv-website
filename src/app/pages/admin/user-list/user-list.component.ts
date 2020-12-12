import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserComponent, DialogWindowComponent } from 'src/app/components';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private _userService:UserService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  users: Array<User>;
  searchText: string;
  paginationConfig = {
    id: 'userList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.users = <Array<User>>await this._userService.listAsync();
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }

  openAddUserModal(Id = null) {
    const diologRef = this._dialog.open(AddUserComponent, {
      width: '500px',
      data: this.users.find(
        (user) => user.id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async userDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._userService.deleteAsync({ Id });
          this.users.splice(
            this.users.findIndex((user) => user.id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('User information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._userService.errorNotification(error);
        }
      }
    });
  }

}
