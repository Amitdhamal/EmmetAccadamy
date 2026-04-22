import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  getYear: number;

  constructor() {
    this.getYear = new Date().getFullYear();
  }
}
