import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models';
import { PersonalInformationService } from '../../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-view-personel',
  templateUrl: './update-view-personel.component.html',
  styleUrls: ['./update-view-personel.component.scss']
})
export class UpdateViewPersonelComponent implements OnInit {

  constructor(
    private _personalInformationService: PersonalInformationService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router
  ) { }

  personal: Personal = new Personal();
  _action: Function;
  _userListRenew: boolean = false;

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
    console.log(personalForm.value);
    if (personalForm.valid) {
      this._translateService
        .get('event registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(personalForm))) return;
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
      console.error(error);
      this._personalInformationService.errorNotification(error);
      return false;
    }
  }

}
