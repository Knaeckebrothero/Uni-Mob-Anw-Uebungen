import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationBarService {
  private showSidenavSource = new BehaviorSubject<boolean>(true);
  showSidenav$ = this.showSidenavSource.asObservable();

  toggleSidenav() {
    this.showSidenavSource.next(!this.showSidenavSource.value);
  }
}
