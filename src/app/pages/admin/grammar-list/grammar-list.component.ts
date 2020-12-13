import { Component, OnInit } from '@angular/core';
import { Grammar } from 'src/app/models';
import { GrammarService } from '../../../utils/services';

@Component({
  selector: 'app-grammar-list',
  templateUrl: './grammar-list.component.html',
  styleUrls: ['./grammar-list.component.scss']
})
export class GrammarListComponent implements OnInit {

  constructor(
    private _grammarService:GrammarService,
  ) { }

  searcText = "";
  grammars: Array<Grammar>;

  async ngOnInit() {
    this.grammars=<Array<Grammar>> await this._grammarService.listAsync();
    console.log(this.grammars)
  }

}
