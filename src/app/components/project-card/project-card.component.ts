import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  template: '<div class="project-card"><ng-content></ng-content></div>',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;

  ngOnInit() {}
}
