import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private location: Location
  ) { }

  private action: string;
  private id: string;
  private isReady: boolean = false;

  ngOnInit() {
    this.action = this.activatedRouter.snapshot.paramMap.get('action');
    console.log(this.action);
    if (this.action == 'edit') {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      console.log(this.id);
      // TODO: get template info from server then set isReady = true
      this.isReady = true;
    } else {
      this.isReady = true;
    }
  }

  capitalize() {
    return this.action.charAt(0).toUpperCase() + this.action.slice(1);
  }

  onBackButtonClicked() {
    this.location.back();
  }

}
