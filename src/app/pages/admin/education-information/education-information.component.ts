import { Component, OnInit } from '@angular/core';
import { EducationInformationService } from '../../../utils/services';
import { EducationInformation } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEducationInformationComponent, DialogWindowComponent } from 'src/app/components';
@Component({
  selector: 'app-education-information',
  templateUrl: './education-information.component.html',
  styleUrls: ['./education-information.component.scss']
})
export class EducationInformationComponent implements OnInit {

  constructor(
    private _educationInformationService: EducationInformationService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }
  
  searchText = "";
  educationInformations: Array<EducationInformation>;

 async ngOnInit() {
   try{
    this.educationInformations=<Array<EducationInformation>> await this._educationInformationService.listAsync();
   }catch(error){
     this._educationInformationService.errorNotification(error);
   }
  }
  openAddEducationInformationModal(Id=null){
    const diologRef = this._dialog.open(AddEducationInformationComponent, {
      width: '500px',
      data: this.educationInformations.find(
        (event) => event.Id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
}

async educationInformationDelete(Id) {
  const diologRef = this._dialog.open(DialogWindowComponent, {
    data: {
      message: 'Are you sure you want to delete the education information ?',
      icon: 'fa fa-exclamation',
    },
  });

  diologRef.afterClosed().subscribe(async (result: boolean) => {
    if (result) {
      try {
        await this._educationInformationService.deleteAsync({ Id });
        this.educationInformations.splice(
          this.educationInformations.findIndex((event) => event.Id == Id),
          1
        );
        let notificationMessage: string;
        this._translateService
          .get('Education information was successfully deleted')
          .subscribe((value) => (notificationMessage = value));

        this._snackBar.open(notificationMessage, 'X', {
          duration: 3000,
          panelClass: 'notification__success',
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      } catch (error) {
        this._educationInformationService.errorNotification(error);
      }
    }
  });
}

}
