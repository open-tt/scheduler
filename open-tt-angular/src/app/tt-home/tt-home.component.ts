import { Component, OnInit } from '@angular/core';
import { LabeledContent } from '../component-library/tt-labeled-info-group/tt-labeled-info-group.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tt-home',
  templateUrl: './tt-home.component.html',
  styleUrls: ['./tt-home.component.scss'],
})
export class TtHomeComponent {}
