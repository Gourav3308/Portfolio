import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  template: '<div class="timeline"><ng-content></ng-content></div>',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() items: any[] = [];

  ngOnInit() {}
}
