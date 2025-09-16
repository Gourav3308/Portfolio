import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  template: '<div class="contact-form"><ng-content></ng-content></div>',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  ngOnInit() {}
}
