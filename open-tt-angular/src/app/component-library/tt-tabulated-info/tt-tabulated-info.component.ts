import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tt-tabulated-info',
  templateUrl: './tt-tabulated-info.component.html',
  styleUrls: ['./tt-tabulated-info.component.scss'],
})
export class TtTabulatedInfoComponent implements OnInit {
  columns: string[];
  rows: string[];
  data: object;
  columnWidth: number;

  constructor() {
    this.columns = ['', 'm', 't', 'w', 'th', 'f', 's', 'su'];
    this.columnWidth = 100 / this.columns.length;
    this.data = {
      m: {
        title: 'M',
        open: '8 am',
        close: '10 pm',
      },
      t: {
        title: 'T',
        open: '8 am',
        close: '10 pm',
      },
      w: {
        title: 'W',
        open: '8 am',
        close: '10 pm',
      },
      th: {
        title: 'T',
        open: '8 am',
        close: '10 pm',
      },
      f: {
        title: 'F',
        open: '8 am',
        close: '10 pm',
      },
      s: {
        title: 'S',
        open: '8 am',
        close: '10 pm',
      },
      su: {
        title: 'S',
        open: '8 am',
        close: '10 pm',
      },
    };
    this.rows = ['open', 'close'];
  }

  ngOnInit(): void {}
}
