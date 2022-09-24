import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PageDesign';
  activeMenu="Home"
  activeDesk="Private Office"
  deskOptions=[
    "Private Office",
    "Dedicated Desk",
    "Shared Desk"
  ]
  menuTitles: Array<string> =[
    'Home',
    'Features',
    'Integrations',
    'Pricing',
    'Customers',
    'Login']
}
