import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TTRoute } from '../../routing.constants';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tt-wrapper-theme-small',
  templateUrl: './tt-wrapper-theme-small.component.html',
  styleUrls: ['./tt-wrapper-theme-small.component.css'],
})
export class TtWrapperThemeSmallComponent {}
