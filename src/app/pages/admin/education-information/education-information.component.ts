import { Component, OnInit } from '@angular/core';
import { EducationInformationService } from '../../../utils/services';
import { EducationInformation } from 'src/app/models';

@Component({
  selector: 'app-education-information',
  templateUrl: './education-information.component.html',
  styleUrls: ['./education-information.component.scss']
})
export class EducationInformationComponent implements OnInit {

  constructor(
    private _educationInformationService: EducationInformationService,
  ) { }
  
  searchText = "";
  educationInformations: Array<EducationInformation>;

 async ngOnInit() {
    this.educationInformations=<Array<EducationInformation>> await this._educationInformationService.listAsync();
    console.log(this. educationInformations)
  }

}
