import { Component, OnInit } from '@angular/core';
import { UpdatePersonalComponent } from 'src/app/components';
import { Personal } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInformationService } from '../../../utils/services';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  constructor(
    private _personalInformationService: PersonalInformationService,
    private _dialog: MatDialog,
  ) { }

  personal: Personal = new Personal();
  searchText = "";

  async ngOnInit() {
    try {
      this.personal = <Personal>await this._personalInformationService.listAsync();
    } catch (error) {
      this._personalInformationService.errorNotification(error);
    }
  }

  openUpdatePersonalModal() {
    const diologRef = this._dialog.open(UpdatePersonalComponent, {
      width: '500px',
    })
  }

}
