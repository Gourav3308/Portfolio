import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-sphere',
  template: '<div class="skill-sphere-container"><div class="skill-sphere"></div></div>',
  styleUrls: ['./skill-sphere.component.scss']
})
export class SkillSphereComponent implements OnInit {
  @Input() skills: any[] = [];

  ngOnInit() {}
}
