import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-entity-card',
  templateUrl: './tt-entity-card.component.html',
  styleUrls: ['./tt-entity-card.component.scss'],
})
export class TtEntityCardComponent implements OnInit {
  @Input() title;
  @Input() subtitle;
  @Input() imageUrl;
  @Input() alt = 'Photo of a Shiba Inu';
  @Input() bg = 'none';

  constructor() {}

  ngOnInit(): void {}
}
