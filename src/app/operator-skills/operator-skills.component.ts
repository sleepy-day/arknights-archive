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
  }

  parseSkillText(skillInf: object): string {
    return this.textParser.parseSkillDescription(skillInf);
  }

  showTooltip(id: string): void {
    let tt = document.getElementById(id);
  }

}
