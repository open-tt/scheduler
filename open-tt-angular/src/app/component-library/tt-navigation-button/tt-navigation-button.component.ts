import {Component, Input, OnInit} from '@angular/core';
import { HostListener  } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tt-navigation-button',
  templateUrl: './tt-navigation-button.component.html',
  styleUrls: ['./tt-navigation-button.component.scss']
})
export class TtNavigationButtonComponent implements OnInit {
  @Input() title: string; // Button Text
  @Input() href: string; // Path to route to
  isActive: boolean;

  constructor(
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      let activeRoute = this.router.url;
      if (
        activeRoute.length > 0 &&
        activeRoute[0] === '/'
      ){
        activeRoute = activeRoute.substr(1);
      }
      this.isActive = activeRoute === this.href;
    });
  }

  ngOnInit(): void {
  }

  @HostListener('click') onClick(): void{
    this.router.navigate([this.href]);
  }
}
