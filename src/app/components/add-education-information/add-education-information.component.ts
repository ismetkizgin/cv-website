import { Component, OnInit, Inject } from '@angular/core';
import { EducationInformationService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EducationInformation } from '../../models';

@Component({
  selector: 'app-add-education-information',
  templateUrl: './add-education-information.component.html',
  styleUrls: ['./add-education-information.component.scss']
})
export class AddEducationInformationComponent implements OnInit {

  constructor(
    private _educationInformationService: EducationInformationService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddEducationInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  educationInformation: EducationInformation = new EducationInformation();
  _action: Function;
  _userListRenew: boolean = false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.educationInformation = <any>await this._educationInformationService.findAsync(this.data?.Id);
        console.log(this.educationInformation)
      } catch (error) {
        this._educationInformationService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(educationInformationForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (educationInformationForm.valid) {
      this._translateService
        .get('Education Information registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(educationInformationForm))) return;
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

  async insertActionAsync(educationInformationForm: NgForm) {
    try {
      console.log(educationInformationForm.value);
      await this._educationInformationService.insertAsync(educationInformationForm.value);
      educationInformationForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._educationInformationService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(educationInformationForm: NgForm) {
    console.log(educationInformationForm.value)
    try {
      await this._educationInformationService.updateAsync(
        Object.assign(educationInformationForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._educationInformationService.errorNotification(error);
      return false;
    }
  }
}
