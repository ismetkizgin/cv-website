import { Component, OnInit, Inject } from '@angular/core';
import { EventsService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Event } from '../../models';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(
    private _eventService: EventsService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  event: Event = new Event();
  _action: Function;
  _userListRenew: boolean = false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.event = <any>await this._eventService.findAsync(this.data?.Id);
        console.log(this.event)
      } catch (error) {
        this._eventService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(eventForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (eventForm.valid) {
      this._translateService
        .get('event registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(eventForm))) return;
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

  async insertActionAsync(eventForm: NgForm) {
    try {
      console.log(eventForm.value);
      await this._eventService.insertAsync(eventForm.value);
      eventForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._eventService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(eventForm: NgForm) {
    console.log(eventForm.value)
    try {
      await this._eventService.updateAsync(
        Object.assign(eventForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._eventService.errorNotification(error);
      return false;
    }
  }

}
