import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operator-stats',
  templateUrl: './operator-stats.component.html',
  styleUrls: ['./operator-stats.component.scss']
})
export class OperatorStatsComponent implements OnInit {
  @Input('rarity') rarity: number;
  @Input('stats') stats: object[];
  evolveCost: object[] = [];
  currentDiv: string = "stats0";
  showUpgradeCost: boolean = false;

  constructor(
    private opService: OpInfoService
  ) { }

  ngOnInit(): void {
    let cost: object[][] = [];
    for (let stat of this.stats) {
      if (stat["evolveCost" as keyof object] !== null) {
        console.log("stat", stat["evolveCost" as keyof object]);
        cost.push(stat["evolveCost" as keyof object]);
      }
    }
    this.evolveCost = this.opService.getItemsForSkillCost(cost);
    console.log(this.evolveCost);
  }

  selectTab(id: string): void {
    this.currentDiv = id;
  }

  toggleCostDisplay(): void {
    this.showUpgradeCost = !this.showUpgradeCost;
  }

}
