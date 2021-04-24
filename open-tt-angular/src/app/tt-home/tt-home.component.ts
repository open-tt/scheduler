import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tt-home',
  templateUrl: './tt-home.component.html',
  styleUrls: ['./tt-home.component.scss'],
})
export class TtHomeComponent implements OnInit {
  userInfo: LabeledContent[];
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.hasLoggedInUser()) {
      this.router.navigate(['/registrations']);
      return;
    }

    if (this.userService.loggedInUser === undefined) {
      this.userService.loadUser().subscribe((loaded) => {
        if (loaded) {
          this.userInfo = [
            new LabeledContent('name', this.userService.loggedInUser.name),
            new LabeledContent('email', this.userService.loggedInUser.id),
          ];
        } else {
          console.error('Failed to load user.');
        }
      });
    } else {
      this.userInfo = [
        new LabeledContent('name', this.userService.loggedInUser.name),
        new LabeledContent('email', this.userService.loggedInUser.id),
      ];
    }
  }
}
