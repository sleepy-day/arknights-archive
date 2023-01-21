import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AKTextParserService } from '../../../services/ak-text-parser/aktext-parser.service';

import { OpInfoService } from '../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OperatorComponent implements OnInit {
  professions = new Map([
    ['WARRIOR', 'Guard'],
    ['TANK', 'Defender'],
    ['CASTER', 'Caster'],
    ['SNIPER', 'Sniper'],
    ['PIONEER', 'Vanguard'],
    ['MEDIC', 'Medic'],
    ['SUPPORT', 'Supporter'],
    ['SPECIAL', 'Specialist'],
  ]);

  operator: object;
  altOps: object[];
  altClass: object[];
  group: object;
  subProfName: string;
  token: object;
  modules: object;

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private opService: OpInfoService,
    private textParser: AKTextParserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap;
    this.route.params.subscribe((params) => {
      let name = params['opName'];
      this.operator = this.opService.getOperatorByName(name);
      if (JSON.stringify(this.operator) === '{}') {
        console.log('Error loading operator:', name);
        return;
      }
      this.altClass = this.opService.getOperatorAltClassByName(name);
      this.altOps = this.opService.getOperatorAlterById(
        this.operator['id' as keyof object]
      );
      this.group = this.opService.getGroupById(
        this.operator['info' as keyof object]
      );
      this.subProfName = this.opService.getSubProfessionById(
        this.operator['info' as keyof object]['subProfessionId' as keyof string]
      );
      this.token = this.opService.getItemById(
        this.operator['info' as keyof object]['potentialItemId']
      );
      this.modules = this.opService.getModulesForOperator(
        this.operator['id' as keyof object]
      );
    });
  }

  parseDescription(desc: string) {
    return this.textParser.parseDescription(desc);
  }
}
