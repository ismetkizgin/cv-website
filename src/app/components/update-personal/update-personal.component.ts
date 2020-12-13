import { Component, OnInit, Inject } from '@angular/core';
import { PersonalInformationService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Personal } from 'src/app/models';

@Component({
  selector: 'app-update-personal',
  templateUrl: './update-personal.component.html',
  styleUrls: ['./update-personal.component.scss']
})
export class UpdatePersonalComponent implements OnInit {

  constructor(
    private _personalInformationService:PersonalInformationService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<UpdatePersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  personal:Personal=new Personal();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
      try {
        this.personal = <any>await this._personalInformationService.listAsync();
        console.log(this.personal)
      } catch (error) {
        this._personalInformationService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
  }
  async onSave(personalForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (personalForm.valid) {
      this._translateService
        .get('Personal registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(personalForm))) return;
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

  async updateActionAsync(personalForm: NgForm) {
    console.log(personalForm.value)
    try {
      await this._personalInformationService.updateAsync(personalForm.value)
    } catch (error) {
      this._personalInformationService.errorNotification(error);
      return false;
    }
  }

}
