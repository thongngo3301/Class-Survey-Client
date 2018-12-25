import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { isRegExp } from 'util';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrNotificationService,
    private location: Location
  ) { }

  private action: string;
  private id: string;
  private isReady: boolean = false;

  private type: string;
  private title: string;
  private subjectName: string;
  private subjectId: string;
  private selectedSemester: string;
  private semesterOptions: Array<string>;
  private selectedTemplate: any;
  private templateOptions: Array<any>;
  private deadline: Date;

  private columns: Array<any> = [];
  private data: Array<any> = [];

  private surveyForm: FormGroup;
  private config: object = {
    search: true,
    placeholder: 'Select...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };
  private isSubmitted = false;

  ngOnInit() {
    this.action = this.activatedRouter.snapshot.paramMap.get('action');
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.buildForm();
    switch (this.action) {
      case 'edit':

        // TODO: call api to get survey data
        this.title = 'Edit Survey';
        this.semesterOptions = ['HK1-2018', 'HK2-2018'];
        this.templateOptions = ['Template1', 'Template2'];
        this.deadline = new Date("Tue Dec 25 2018 22:21:53 GMT+0700 (Indochina Time)");
        this.isReady = true;
        // this.apiService.getSurveyData(this.id).subscribe((result) => {
        //   if (result && result.success) {
        //     const _data = result.data;
        //   } else {
        //     this.toastr.error(result.message);
        //   }
        // });
        break;
      case 'view':
        this.title = 'Class List';
        // TODO: call api to get class list
        this.columns = [
          { title: 'ID', name: 'id', filtering: { filterString: '', placeholder: 'Filter by ID' } },
          { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by Name' } },
          { title: 'Date of Birth', name: 'dob', filtering: { filterString: '', placeholder: 'Filter by DoB' } },
          { title: 'Base Class', name: 'base_class', filtering: { filterString: '', placeholder: 'Filter by BC' } }
        ];
        this.data = [
          { "id": "537", "name": "Wallie Kenset", "dob": "10/10/2018", "base_class": "Kutch, Howell and Legros" },
          { "id": "749", "name": "Dominic Cranfield", "dob": "1/30/2018", "base_class": "Sanford-Cartwright" },
          { "id": "1", "name": "Joete Charlwood", "dob": "4/29/2018", "base_class": "Fay and Sons" },
          { "id": "37158", "name": "Rickert Toulson", "dob": "5/12/2018", "base_class": "Balistreri-Hudson" },
          { "id": "7", "name": "Roman Bodley", "dob": "1/24/2018", "base_class": "Wiza LLC" },
          { "id": "6263", "name": "Llewellyn Benedikt", "dob": "10/12/2018", "base_class": "Auer, Casper and Hettinger" },
          { "id": "04", "name": "Torry Guard", "dob": "5/28/2018", "base_class": "Denesik-Green" },
          { "id": "3243", "name": "Lonni Leighfield", "dob": "11/20/2018", "base_class": "Legros-Klein" },
          { "id": "0", "name": "Drusy Scourge", "dob": "1/5/2018", "base_class": "Renner-Goldner" },
          { "id": "00", "name": "Dominick Koomar", "dob": "12/6/2017", "base_class": "Luettgen Inc" },
          { "id": "6132", "name": "Hort Barsby", "dob": "6/21/2018", "base_class": "Hettinger, Towne and Graham" },
          { "id": "8", "name": "Kyle Coultard", "dob": "5/8/2018", "base_class": "Wilderman-Hirthe" },
          { "id": "1", "name": "Padget Matysiak", "dob": "2/12/2018", "base_class": "Vandervort-Bechtelar" },
          { "id": "0591", "name": "Reine Camin", "dob": "7/7/2018", "base_class": "Kemmer, Gottlieb and Jakubowski" },
          { "id": "00520", "name": "Linn Duckitt", "dob": "11/22/2018", "base_class": "Koepp-Lehner" },
          { "id": "1", "name": "Rozele Varley", "dob": "2/2/2018", "base_class": "Rowe, Bartoletti and Trantow" },
          { "id": "8", "name": "Templeton Halt", "dob": "3/13/2018", "base_class": "Hyatt-Waters" },
          { "id": "51", "name": "Orelie Ellesmere", "dob": "8/29/2018", "base_class": "Carter-Auer" },
          { "id": "9321", "name": "Antonina Beau", "dob": "8/1/2018", "base_class": "Considine, Runte and Bins" },
          { "id": "49", "name": "Nolie McCaughey", "dob": "10/6/2018", "base_class": "Parisian, Walker and Pfannerstill" },
          { "id": "33", "name": "Amby Somerfield", "dob": "6/18/2018", "base_class": "Runte, Heller and West" }
        ];
        this.isReady = true;
        break;
      case 'result':
        this.title = "Survey Result";
        // TODO: call api to get survey stats
        this.columns = [
          { title: 'No.', name: 'no', filtering: { filterString: '', placeholder: 'Filter by No.' } },
          { title: 'Criteria', name: 'criteria', filtering: { filterString: '', placeholder: 'Filter by Criteria' } },
          { title: 'Date of Birth', name: 'dob', filtering: { filterString: '', placeholder: 'Filter by DoB' } },
          { title: 'Base Class', name: 'base_class', filtering: { filterString: '', placeholder: 'Filter by BC' } }
        ];
        this.data = [
          { "no": "537", "criteria": "Wallie Kenset", "dob": "10/10/2018", "base_class": "Kutch, Howell and Legros" },
          { "no": "749", "criteria": "Dominic Cranfield", "dob": "1/30/2018", "base_class": "Sanford-Cartwright" },
          { "no": "1", "criteria": "Joete Charlwood", "dob": "4/29/2018", "base_class": "Fay and Sons" },
          { "no": "37158", "criteria": "Rickert Toulson", "dob": "5/12/2018", "base_class": "Balistreri-Hudson" },
          { "no": "7", "criteria": "Roman Bodley", "dob": "1/24/2018", "base_class": "Wiza LLC" },
          { "no": "6263", "criteria": "Llewellyn Benedikt", "dob": "10/12/2018", "base_class": "Auer, Casper and Hettinger" },
          { "no": "04", "criteria": "Torry Guard", "dob": "5/28/2018", "base_class": "Denesik-Green" },
          { "no": "3243", "criteria": "Lonni Leighfield", "dob": "11/20/2018", "base_class": "Legros-Klein" },
          { "no": "0", "criteria": "Drusy Scourge", "dob": "1/5/2018", "base_class": "Renner-Goldner" },
          { "no": "00", "criteria": "Dominick Koomar", "dob": "12/6/2017", "base_class": "Luettgen Inc" },
          { "no": "6132", "criteria": "Hort Barsby", "dob": "6/21/2018", "base_class": "Hettinger, Towne and Graham" },
          { "no": "8", "criteria": "Kyle Coultard", "dob": "5/8/2018", "base_class": "Wilderman-Hirthe" },
          { "no": "1", "criteria": "Padget Matysiak", "dob": "2/12/2018", "base_class": "Vandervort-Bechtelar" },
          { "no": "0591", "criteria": "Reine Camin", "dob": "7/7/2018", "base_class": "Kemmer, Gottlieb and Jakubowski" },
          { "no": "00520", "criteria": "Linn Duckitt", "dob": "11/22/2018", "base_class": "Koepp-Lehner" },
          { "no": "1", "criteria": "Rozele Varley", "dob": "2/2/2018", "base_class": "Rowe, Bartoletti and Trantow" },
          { "no": "8", "criteria": "Templeton Halt", "dob": "3/13/2018", "base_class": "Hyatt-Waters" },
          { "no": "51", "criteria": "Orelie Ellesmere", "dob": "8/29/2018", "base_class": "Carter-Auer" },
          { "no": "9321", "criteria": "Antonina Beau", "dob": "8/1/2018", "base_class": "Considine, Runte and Bins" },
          { "no": "49", "criteria": "Nolie McCaughey", "dob": "10/6/2018", "base_class": "Parisian, Walker and Pfannerstill" },
          { "no": "33", "criteria": "Amby Somerfield", "dob": "6/18/2018", "base_class": "Runte, Heller and West" }
        ];
        this.isReady = true;
        break;
      case 'new':
        this.title = 'New Survey';
        this.isReady = true;
        break;
    }
  }

  ngAfterViewInit() {
    $('ngx-select-dropdown button.ngx-dropdown-button').css('border-radius', '30px');
  }

  stringifyDate(date: Date) {
    return ((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  buildForm() {
    this.surveyForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      subjectId: ['', Validators.required],
      deadline: []
    });
  }

  get formCtrl() { return this.surveyForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.subjectName);

    if (!this.selectedSemester) {
      this.toastr.error('Please select a semester!');
      return;
    }
    if (!this.selectedTemplate) {
      this.toastr.error('Please select a survey template!');
      return;
    }

    if (this.surveyForm.invalid) return;

    // TODO: call apiService to create/edit survey then navigate to survey manager
    this.router.navigate(['/survey-manager']);
  }

  onResultButtonClicked() {
    this.router.navigate(['/survey-manager', 'result', this.id]);
  }

  onPrintButtonClicked() {
    console.log('print');
  }

  onBackButtonClicked() {
    this.location.back();
  }
}
