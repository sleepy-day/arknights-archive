import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operator-skills-cost',
  templateUrl: './operator-skills-cost.component.html',
  styleUrls: ['./operator-skills-cost.component.scss']
})
export class OperatorSkillsCostComponent implements OnInit {
  @Input('skillCostDisplay') skillCostDisplay: boolean;
  @Input('skillCosts') skillCosts: object[][];
  @Input('currentSkill') currentSkill: number;
  @Input('currentSkillLvl') currentSkillLvl: number;
  
  items: object[][] = [];

  constructor(
    private opService: OpInfoService,
  ) { }

  ngOnInit(): void {
    for (let skillCost of this.skillCosts) {
      let itemInfo: object[][] = [];

      for (let [i, cost] of skillCost.entries()) {
        if (i >= 6) {
          itemInfo.push(cost["levelUpCost" as keyof object]);
        } else {
          itemInfo.push(cost["lvlUpCost" as keyof object]);
        }
      }

      this.items.push(this.opService.getItemsForSkillCost(itemInfo));
    }

    console.log(this.items);
  }

}
