import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) { }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET', 'personal-information', null, true);
  }

  async findAsync(Id) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `personal-information/${Id}`,
      null
    );
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'personal-information',
      values,
      true
    );
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 400:
        this._translateService
          .get('Personal information does not match !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 409:
        this._translateService
          .get('Such an personal information is already registered in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct personel information !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 404:
        this._translateService
          .get('No personel information record found in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage, 'X', {
      duration: 4000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
