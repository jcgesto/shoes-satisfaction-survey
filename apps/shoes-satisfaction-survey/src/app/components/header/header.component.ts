import { Component, Input } from '@angular/core';

@Component({
  selector: 'myorg-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  @Input()
  title: string | undefined

  @Input()
  description: string | undefined
}
