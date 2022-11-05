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
  skillInfo: object[] = [];
  currentDiv: string = "skill0";
  currentSkill: number = 0;
  currentLvlDisplay = [0, 0, 0];
  currentSpType: number;
  currentSkillType: number;
  currentDuration: number;
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
  }

  constructor(
    private opService: OpInfoService,
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    for (var skill of this.skills) {
      var id = skill["skillId" as keyof object];
      console.log(id);
      this.skillInfo.push(this.opService.getSkillInfoById(String(id)))
    }
    console.log(this.skillInfo);
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
    this.currentSpType = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["spData"]["spType"];
    this.currentSkillType = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["skillType"];
    this.currentDuration = this.skillInfo[Number(this.currentDiv.slice(-1))]["levels" as keyof object][this.currentLvlDisplay[this.currentSkill]]["duration"];
    console.log(this.currentDuration);
  }

}
