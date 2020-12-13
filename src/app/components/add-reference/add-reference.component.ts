import { Component, OnInit, Inject } from '@angular/core';
import { ReferenceService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Reference } from 'src/app/models';

@Component({
  selector: 'app-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['./add-reference.component.scss']
})
export class AddReferenceComponent implements OnInit {

  constructor(
    private _referenceService:ReferenceService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddReferenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  reference:Reference=new Reference();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.reference = <any>await this._referenceService.findAsync(this.data?.Id);
        console.log(this.reference)
      } catch (error) {
        this._referenceService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(referenceForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (referenceForm.valid) {
      this._translateService
        .get('Project registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(referenceForm))) return;
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

  async insertActionAsync(referenceForm: NgForm) {
    try {
      console.log(this.reference);
      await this._referenceService.insertAsync(referenceForm.value);
      referenceForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._referenceService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(referenceForm: NgForm) {
    console.log(referenceForm.value)
    try {
      await this._referenceService.updateAsync(
        Object.assign(referenceForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._referenceService.errorNotification(error);
      return false;
    }
  }

}
