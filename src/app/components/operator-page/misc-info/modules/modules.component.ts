import { Component, OnInit, Input } from '@angular/core';
import { AKTextParserService } from 'src/app/services/ak-text-parser/aktext-parser.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OpInfoService } from 'src/app/services/op-info/op-info.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  @Input("modules") modules: object;
  battleModule: object[] = [];
  battleModuleCN: object[] = [];
  moduleDetails: object[] = [];
  showCN: boolean = false;
  currentModule: number = 0;
  currentModuleCN: number = 0;
  currentModuleLevel: number = 0;

  stats = new Map([
    ["max_hp", "HP"],
    ["atk", "Attack"],
    ["def", "Defense"],
    ["attack_speed", "Attack Speed"],
    ["magic_resistance", "Resistance"],
    ["cost", "Cost"],
    ["block_cnt", "Block"],
    ["respawn_time", "Respawn Time"]
  ])

  constructor(
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
    private opInfoService: OpInfoService,
  ) { }

  ngOnInit(): void {
    let modInfo: object[] = this.modules["modInfo" as keyof object];
    console.log(this.modules);

    for (let module of modInfo) {
      let phases: object[] = module["battleDetailsCN" as keyof object]["phases"];
      let battleDetailsCN: object[] = [];
      let battleDetails: object[] = [];
      let details: object = {};

      battleDetailsCN = this.extractModuleInfo(phases);

      if (module["battleDetails" as keyof object] !== undefined) {
        phases = module["battleDetails" as keyof object]["phases"];
        battleDetails  = this.extractModuleInfo(phases);
        details = module["details" as keyof object];
      }

      this.moduleDetails.push({ details: details,
                                battleDetails: battleDetails,
                                detailsCN: module["detailsCN" as keyof object],
                                battleDetailsCN: battleDetailsCN });      
    }

    if (Array(this.moduleDetails["battleDetails" as keyof object]).length === 0) {
      this.showCN = true;
    }

    console.log(this.moduleDetails);
  }

  extractModuleInfo(phases: object[]): object[] {
    let level: object[] = [];

    for (let phase of phases) {  
      let parts: object[] = phase["parts" as keyof object];
      let talentLevel: object[] = [];
      let traitLevel: object[] = [];
      let rangeId: string = '';
      let rangeGrid: number[][] = [];
      let attributes: object[] = phase["attributeBlackboard" as keyof object];

      for (let part of parts) {
        if (part["addOrOverrideTalentDataBundle" as keyof object]["candidates"] !== null) {
          let talentCandidates: object[] = part["addOrOverrideTalentDataBundle" as keyof object]["candidates"];

          for (let candidate of talentCandidates) {
            let c: {[k: string]: any} = {};

            if (candidate["displayRangeId" as keyof object] === true) { 
              rangeId = candidate["rangeId" as keyof object]; 
              rangeGrid = this.opInfoService.getRangeInfo(rangeId);
            }
            if (candidate["name" as keyof object] !== null) { c["name"] = candidate["name" as keyof object]; }
            if (candidate["upgradeDescription" as keyof object] !== "") { 
              c["upgradeDescription"] = candidate["upgradeDescription" as keyof object];
              c["blackboard"] = candidate["blackboard" as keyof object];
            }
            if (candidate["requiredPotentialRank" as keyof object] > 0) { c["requiredPotentialRank"] = candidate["requiredPotentialRank" as keyof object]; }

            if (Object.keys(c).length > 0) {
              talentLevel.push(c);
            }
          }
        }

        if (part["overrideTraitDataBundle" as keyof object]["candidates"] !== null) {
          let traitCandidates: object[] = part["overrideTraitDataBundle" as keyof object]["candidates"]

          for (let candidate of traitCandidates) {
            let c: {[k: string]: any} = {};

            if (candidate["overrideDescripton" as keyof object] !== null) { c["overrideDescription"] = candidate["overrideDescripton" as keyof object]; }
            if (candidate["additionalDescription" as keyof object] !== null) { c["additionalDescription"] = candidate["additionalDescription" as keyof object]; }
            c["blackboard"] = candidate["blackboard" as keyof object];

            traitLevel.push(c);
          }
        }
      }

      level.push({ trait: traitLevel, talent: talentLevel, rangeId: rangeId, rangeGrid: rangeGrid, attributes: attributes });
    }

    return level;
  }

  parseDescriptionValues(desc: string, blackboard: object[]): string {
    return this.textParser.parseValuesInDescription(desc, blackboard);
  }

  toggleCN(): void {
    this.showCN = !this.showCN;
    this.currentModuleLevel = 0;
  }

  toggleModule(mod: number): void {
    this.currentModule = mod;
    this.currentModuleLevel = 0;
  }

  toggleModuleCN(mod: number): void {
    this.currentModuleCN = mod;
    this.currentModuleLevel = 0;
  }

  changeModuleLevel(lvl: number): void {
    this.currentModuleLevel = lvl;
  }

}
