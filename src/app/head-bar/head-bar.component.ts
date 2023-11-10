import { Component } from '@angular/core';
import { NavigationBarService } from '../navbar/navigation-bar.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent {
  constructor(private navService: NavigationBarService) { }

  toggleNavbar() {
    this.navService.toggleSidenav();
  }
}
