import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AKTextParserService } from '../aktext-parser.service';

@Component({
  selector: 'app-operator-skills-level',
  templateUrl: './operator-skills-level.component.html',
  styleUrls: ['./operator-skills-level.component.scss']
})
export class OperatorSkillsLevelComponent implements OnInit {
  @Input('skill') skill: object;
  @Input('skillDetailDisplay') skillDetailDisplay: boolean;
  @Output() currentLvl = new EventEmitter<number>(); 
  currentDiv: string;

  constructor(
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.currentDiv = this.skill["skillId" as keyof object] + "0";
    console.log(this.skill);
    console.log(this.skillDetailDisplay);
  }

  parseSkillText(skillInfo: object) {
    return this.textParser.parseSkillDescription(skillInfo);
  }

  selectTab(id: string): void {
    this.currentDiv = id;
    this.currentLvl.emit(Number(this.currentDiv.slice(-1)));
  }

}
