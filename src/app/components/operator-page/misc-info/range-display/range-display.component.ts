import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-range-display',
  templateUrl: './range-display.component.html',
  styleUrls: ['./range-display.component.scss'],
})
export class RangeDisplayComponent implements OnInit {
  @Input('rangeGrid') rangeGrid: number[][];

  constructor() {}

  ngOnInit(): void {}
}
