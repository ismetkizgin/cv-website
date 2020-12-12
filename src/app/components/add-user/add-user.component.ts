import { Component, OnInit, Inject } from '@angular/core';
import { AuthService, UserService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  user:User=new User();
  _passwordShowHide: boolean = false;
  _action: Function;
  _userListRenew:boolean=false;
  updateTransactionState:boolean=false;

  async ngOnInit() {
    if (this.data?.id != null) {
      try {
        this.user = <any>await this._userService.findAsync(this.data?.id);
      } catch (error) {
        this._userService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this.updateTransactionState=true;
      this._action = this.updateActionAsync;
    } else if (this._router.isActive('/admin/user/profile', true)) {
      this.user = JSON.parse(
        JSON.stringify(this._authService.currentUserValue.result)
      );
      this.user.UserEmail = null;
      this._action = this.updateProfileActionAsync;
    } else {
      this._userListRenew=false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(userForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (userForm.valid) {
      this._translateService
        .get('User registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(userForm))) return;
      this.dialogRef.close(this._userListRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertActionAsync(userForm: NgForm) {
    try {
      console.log(userForm);
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      this._userListRenew=true;
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(userForm: NgForm) {
    console.log(userForm.value)
    try {
      await this._userService.updateAsync(
        Object.assign(userForm.value, {
          Id: parseInt(
            this.data?.id
          ),
        })
      );
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateProfileActionAsync(userForm: NgForm) {
    try {
      await this._authService.updateProfile(userForm.value);
      this.user.UserPassword = null;
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  onAutomaticPasswordGeneration(): void {
    this.user.UserPassword = this._authService.creatingPassword(8);
    this._passwordShowHide = true;
  }
  onPasswordToggle(): void {
    if (this._passwordShowHide) this._passwordShowHide = false;
    else this._passwordShowHide = true;
  }

}
