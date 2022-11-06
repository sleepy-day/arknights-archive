import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AKTextParserService } from '../aktext-parser.service';
import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operator-skills',
  templateUrl: './operator-skills.component.html',
  styleUrls: ['./operator-skills.component.scss']
})
export class OperatorSkillsComponent implements OnInit {
  @Input('skills') skills: object[];
  @Input('skillLvlCost') skillLvlCost: object[];
  skillInfo: object[] = [];
  skillCost: object[][] = [];
  currentDiv: string = "skill0";
  currentSkill: number = 0;
  currentLvlDisplay = [0, 0, 0];
  showSkillDetail: boolean = false;
  showSkillCost: boolean = false;

  spType: { [key: number]: string; } = {
    1: "Auto Recovery",
    2: "Offensive Recovery",
    4: "Defensive Recovery",
    8: "Passive",
  };

  skillType: { [key: number]: string; } = {
    0: "",
    1: "Manual Activation",
    2: "Automatic Activation",
  };

  skillDetail = {
    spType: 0,
    skillType: 0,
    duration: 0,
    initSp: 0,
    spCost: 0,
  };

  constructor(
    private opService: OpInfoService,
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    for (var [i, skill] of this.skills.entries()) {
      var id = skill["skillId" as keyof object];
      console.log(id);
      this.skillInfo.push(this.opService.getSkillInfoById(String(id)));
      this.skillCost[i] = [...this.skillLvlCost, ...skill["levelUpCostCond" as keyof object]];
    }
    console.log(this.skillInfo);
    console.log(this.skillCost);
    this.updateSkillInfo();
  }

  parseSkillText(skillInf: object): string {
    return this.textParser.parseSkillDescription(skillInf);
  }

  showTooltip(id: string): void {
    let tt = document.getElementById(id);
  }

  showTab(id: string): void {
    this.currentDiv = id;
    this.currentSkill = Number(this.currentDiv.slice(-1));
    this.updateSkillInfo();
  }

  getSkillLvl(currentLvl: number): void {
    this.currentLvlDisplay[this.currentSkill] = currentLvl;
    this.updateSkillInfo();
  }

  updateSkillInfo(): void {
    this.skillDetail.spType = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["spData"]["spType"];
    this.skillDetail.skillType = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["skillType"];
    this.skillDetail.duration = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["duration"];
    this.skillDetail.initSp = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["spData"]["initSp"];
    this.skillDetail.spCost = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["spData"]["spCost"];
  }

  toggleSkillDisplay(): void {
    this.showSkillDetail = !this.showSkillDetail;
  }

  toggleSkillCost(): void {
    this.showSkillCost = !this.showSkillCost;
  }

}
