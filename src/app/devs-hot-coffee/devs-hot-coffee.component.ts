import { Component } from '@angular/core';

interface Coffee {
  name: string;
  image: string;
}

@Component({
  selector: 'app-devs-hot-coffee',
  templateUrl: './devs-hot-coffee.component.html',
  styleUrls: ['./devs-hot-coffee.component.scss']
})
export class DevsHotCoffeeComponent {
  coffees: Coffee[] = [
      {
        name: "Perspiciatis",
        image: "assets/images/coffee1.jpg"
      },
      {
        name: "Voluptatem",
        image: "assets/images/coffee2.jpg"
      },
      {
        name: "Explicabo",
        image: "assets/images/coffee3.jpg"
      },
      {
        name: "Rchitecto",
        image: "assets/images/coffee4.jpg"
      },
      {
        name: " Beatae",
        image: "assets/images/coffee5.jpg"
      },
      {
        name: " Vitae",
        image: "assets/images/coffee6.jpg"
      },
      {
        name: "Inventore",
        image: "assets/images/coffee7.jpg"
      },
      {
        name: "Veritatis",
        image: "assets/images/coffee8.jpg"
      },
      {
        name: "Accusantium",
        image: "assets/images/coffee9.jpg"
      }
    ];

  // Constructor can be simplified or even removed if not needed
  constructor() { }
}
