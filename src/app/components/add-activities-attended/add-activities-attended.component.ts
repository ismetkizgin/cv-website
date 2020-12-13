import { Component, OnInit, Inject } from '@angular/core';
import { ActivitiesAttendedService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivitiesAttended } from 'src/app/models';

@Component({
  selector: 'app-add-activities-attended',
  templateUrl: './add-activities-attended.component.html',
  styleUrls: ['./add-activities-attended.component.scss']
})
export class AddActivitiesAttendedComponent implements OnInit {

  constructor(
    private _activitiesAttendedService:ActivitiesAttendedService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddActivitiesAttendedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  activitiesAttended:ActivitiesAttended=new ActivitiesAttended();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.activitiesAttended = <any>await this._activitiesAttendedService.findAsync(this.data?.Id);
        console.log(this.activitiesAttended)
      } catch (error) {
        this._activitiesAttendedService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(activitiesAttendedForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (activitiesAttendedForm.valid) {
      this._translateService
        .get('Activities Attended registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(activitiesAttendedForm))) return;
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

  async insertActionAsync(activitiesAttendedForm: NgForm) {
    try {
      console.log(activitiesAttendedForm);
      await this._activitiesAttendedService.insertAsync(activitiesAttendedForm.value);
      activitiesAttendedForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._activitiesAttendedService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(activitiesAttendedForm: NgForm) {
    console.log(activitiesAttendedForm.value)
    try {
      await this._activitiesAttendedService.updateAsync(
        Object.assign(activitiesAttendedForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._activitiesAttendedService.errorNotification(error);
      return false;
    }
  }

}
