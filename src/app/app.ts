import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './features/home/home';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private router: Router, private viewportScroller: ViewportScroller){}
  protected title = 'frontend';
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
  }
