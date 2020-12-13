import { Component, OnInit, Inject } from '@angular/core';
import { WorkExperienceService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkExperience } from 'src/app/models';

@Component({
  selector: 'app-add-work-experience',
  templateUrl: './add-work-experience.component.html',
  styleUrls: ['./add-work-experience.component.scss']
})
export class AddWorkExperienceComponent implements OnInit {

  constructor(
    private _workExperienceService:WorkExperienceService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddWorkExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  work:WorkExperience=new WorkExperience();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.work = <WorkExperience>await this._workExperienceService.findAsync(this.data?.Id);
      } catch (error) {
        this._workExperienceService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(workForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (workForm.valid) {
      this._translateService
        .get('work experience registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(workForm))) return;
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

  async insertActionAsync(workForm: NgForm) {
    try {
      console.log(workForm);
      await this._workExperienceService.insertAsync(workForm.value);
      workForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._workExperienceService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(workForm: NgForm) {
    console.log(workForm.value)
    try {
      await this._workExperienceService.updateAsync(
        Object.assign(workForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._workExperienceService.errorNotification(error);
      return false;
    }
  }

}
