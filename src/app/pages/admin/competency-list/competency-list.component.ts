import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCompetencyComponent,DialogWindowComponent } from 'src/app/components';
import { Competency } from 'src/app/models';
import { CompetencyService } from '../../../utils/services';
@Component({
  selector: 'app-competency-list',
  templateUrl: './competency-list.component.html',
  styleUrls: ['./competency-list.component.scss']
})
export class CompetencyListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _competencyService: CompetencyService
  ) { }
  
  competencies: Array<Competency>;
  searchText: string;
  paginationConfig = {
    id: 'userList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  async ngOnInit() {
    try {
      this.competencies = <Array<Competency>>await this._competencyService.listAsync();
    } catch (error) {
      this._competencyService.errorNotification(error);
    }
  }

  openAddCompetencyModal(Id = null) {
    const diologRef = this._dialog.open(AddCompetencyComponent, {
      width: '500px',
      data: this.competencies.find(
        (competency) => competency.Id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async competencyDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the competency ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._competencyService.deleteAsync({ Id });
          this.competencies.splice(
            this.competencies.findIndex((competency) => competency.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Competency information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._competencyService.errorNotification(error);
        }
      }
    });
  }

}
