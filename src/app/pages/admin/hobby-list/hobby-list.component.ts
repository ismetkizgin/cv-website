import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddHobbyComponent, DialogWindowComponent } from 'src/app/components';
import { Hobby } from 'src/app/models';
import { HobbyService } from '../../../utils/services';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _hobbyService: HobbyService
  ) { }

  hobbies: Array<Hobby>;
  searchText: string;
  paginationConfig = {
    id: 'hobbyList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.hobbies = <Array<Hobby>>(await this._hobbyService.listAsync());
      console.log("asdfsfsdf",this.hobbies)
    } catch (error) {
      this._hobbyService.errorNotification(error);
    }
  }
  openAddHobbyModal(Id = null) {
    const diologRef = this._dialog.open(AddHobbyComponent, {
      width: '500px',
      data: { Id }
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async hobbyDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the hobby ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._hobbyService.deleteAsync({ Id });
          this.hobbies.splice(
            this.hobbies.findIndex((project) => project.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Hobby information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._hobbyService.errorNotification(error);
        }
      }
    });
  }

}
