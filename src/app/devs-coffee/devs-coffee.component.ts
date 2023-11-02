import { Component, OnInit } from '@angular/core';
import { NavigationBarService } from '../navbar/navigation-bar.service';

@Component({
  selector: 'app-your-component',
  templateUrl: './devs-coffee.component.html',
  styleUrls: ['./devs-coffee.component.scss']
})
export class DevsCoffeeComponent implements OnInit {
  coffees = [
    { name: 'Perspiciatis', image: "assets/images/coffee1.jpg" },
    { name: 'Voluptatem', image: "assets/images/coffee2.jpg" },
    { name: "Voluptatem", image: "assets/images/coffee2.jpg" },
    { name: "Explicabo", image: "assets/images/coffee3.jpg" },
    { name: "Rchitecto", image: "assets/images/coffee4.jpg" },
    { name: " Beatae", image: "assets/images/coffee5.jpg" },
    { name: " Vitae", image: "assets/images/coffee6.jpg" },
    { name: "Inventore", image: "assets/images/coffee7.jpg" },
    { name: "Veritatis", image: "assets/images/coffee8.jpg" },
    { name: "Accusantium", image: "assets/images/coffee9.jpg" },
  ];

  constructor(private navService: NavigationBarService) { }
  
  toggleNavbar() {
    this.navService.toggleSidenav();
  }

  ngOnInit(): void {
    this.showCoffees();
  }

  showCoffees(): void {
    // This method will be handled differently, see below.
  }
}
