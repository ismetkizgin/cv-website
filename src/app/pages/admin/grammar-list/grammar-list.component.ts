import { Component, OnInit } from '@angular/core';
import { AddGrammarComponent, DialogWindowComponent } from 'src/app/components';
import { Grammar } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { GrammarService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grammar-list',
  templateUrl: './grammar-list.component.html',
  styleUrls: ['./grammar-list.component.scss']
})
export class GrammarListComponent implements OnInit {

  constructor(
    private _grammarService:GrammarService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }

  searchText = "";
  grammars: Array<Grammar>;

  async ngOnInit() {
    this.grammars=<Array<Grammar>> await this._grammarService.listAsync();
    console.log(this.grammars)
  }

  openAddGrammarModal(Id=null){
      const diologRef = this._dialog.open(AddGrammarComponent, {
        width: '500px',
        data: this.grammars.find(
          (project) => project.Id == Id
        ),
      });
      diologRef.afterClosed().subscribe((result: any) => {
        if (result) this.ngOnInit();
      });
  }

  async grammarDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._grammarService.deleteAsync({ Id });
          this.grammars.splice(
            this.grammars.findIndex((project) => project.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('User information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._grammarService.errorNotification(error);
        }
      }
    });
  }

}
