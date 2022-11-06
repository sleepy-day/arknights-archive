import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AKTextParserService } from '../aktext-parser.service';
import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operator-skills-level',
  templateUrl: './operator-skills-level.component.html',
  styleUrls: ['./operator-skills-level.component.scss']
})
export class OperatorSkillsLevelComponent implements OnInit {
  @Input('skill') skill: object;
  @Input('skillCost') skillCost: object[];
  @Input('skillDetailDisplay') skillDetailDisplay: boolean;
  @Input('skillCostDisplay') skillCostDisplay: boolean;
  @Output() currentLvl = new EventEmitter<number>(); 
  items: object[];
  currentDiv: string;

  constructor(
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
    private opService: OpInfoService
  ) { }

  ngOnInit(): void {
    this.currentDiv = this.skill["skillId" as keyof object] + "0";
    console.log(this.skillCost);
    let itemInfo: object[][] = [];
    for (let [i, cost] of this.skillCost.entries()) {
      if (i >= 6) {
        itemInfo.push(cost["levelUpCost" as keyof object]);
      } else {
        itemInfo.push(cost["lvlUpCost" as keyof object]);
      }
    }
    this.items = this.opService.getItemsForSkillCost(itemInfo);
    console.log(this.items);
  }

  parseSkillText(skillInfo: object) {
    return this.textParser.parseSkillDescription(skillInfo);
  }

  selectTab(id: string): void {
    this.currentDiv = id;
    this.currentLvl.emit(Number(this.currentDiv.slice(-1)));
  }

}
