import { Component, OnInit, Inject } from '@angular/core';
import { HobbyService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Hobby } from 'src/app/models';

@Component({
  selector: 'app-add-hobby',
  templateUrl: './add-hobby.component.html',
  styleUrls: ['./add-hobby.component.scss']
})
export class AddHobbyComponent implements OnInit {

  constructor(
    private _hobbyService:HobbyService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddHobbyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  hobby:Hobby=new Hobby();
  _action: Function;
  _userListRenew:boolean=false;


  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.hobby = <any>await this._hobbyService.findAsync(this.data?.Id);
        console.log(this.hobby)
      } catch (error) {
        this._hobbyService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(hobbyForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (hobbyForm.valid) {
      this._translateService
        .get('Hobby registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(hobbyForm))) return;
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

  async insertActionAsync(hobbyForm: NgForm) {
    try {
      console.log(hobbyForm);
      await this._hobbyService.insertAsync(hobbyForm.value);
      hobbyForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._hobbyService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(hobbyForm: NgForm) {
    console.log(hobbyForm.value)
    try {
      await this._hobbyService.updateAsync(
        Object.assign(hobbyForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._hobbyService.errorNotification(error);
      return false;
    }
  }

}
