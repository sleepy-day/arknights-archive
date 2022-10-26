import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OperatorComponent implements OnInit {
  professions = new Map([
    ["WARRIOR", "Guard"],
    ["TANK", "Defender"],
    ["CASTER", "Caster"],
    ["SNIPER", "Sniper"],
    ["PIONEER", "Vanguard"],
    ["MEDIC", "Medic"],
    ["SUPPORT", "Supporter"],
    ["SPECIAL", "Specialist"]
  ])

  operator: object;
  altOps: object[];
  altClass: object[];
  group: object;

  subProfName: string;

  constructor(
    private route: ActivatedRoute,
    private opService: OpInfoService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    this.route.params.subscribe(params => {
      let name = params['opName'];
      this.operator = this.opService.getOperatorByName(name);
      if (JSON.stringify(this.operator) === "{}") {
        console.log("Error loading operator:", name);
        return;
      }
      this.altClass = this.opService.getOperatorAltClassByName(name);
      this.altOps = this.opService.getOperatorAlterById(this.operator["id" as keyof object]);
      this.group = this.opService.getGroupById(this.operator["info" as keyof object]);
      this.subProfName = this.opService.getSubProfessionById(this.operator["info" as keyof object]["subProfessionId" as keyof string])
      console.log(this.group);
    })
  }

  parseDescription(desc: string) {
    const r = new RegExp('(<@ba\.kw>)(.*)(<\/>)')
    desc.replace(r, "<span class='highlight'>$2<\/span>")
    return desc.replace(r, "<span class='highlight'>$2<\/span>")
  }

}
