import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operator-level-cost',
  templateUrl: './operator-level-cost.component.html',
  styleUrls: ['./operator-level-cost.component.scss']
})
export class OperatorLevelCostComponent implements OnInit {
  @Input('evoCost') evoCost: object;
  @Input('rarity') rarity: number;
  @Input('evoLvl') evoLvl: number;
  evolveGoldCost: number[][] = [
    [
      -1,
      -1
    ],
    [
      -1,
      -1
    ],
    [
      10000,
      -1
    ],
    [
      15000,
      60000
    ],
    [
      20000,
      120000
    ],
    [
      30000,
      180000
    ]
  ];

  constructor() { }

  ngOnInit(): void {}

}
