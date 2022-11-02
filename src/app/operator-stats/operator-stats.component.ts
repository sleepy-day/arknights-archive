import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operator-stats',
  templateUrl: './operator-stats.component.html',
  styleUrls: ['./operator-stats.component.scss']
})
export class OperatorStatsComponent implements OnInit {
  @Input('rarity') rarity: number;
  @Input('stats') stats: object[];
  currentDiv: string = "stats0";

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(id: string): void {
    this.currentDiv = id;
  }

}
