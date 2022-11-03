import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operator-class',
  templateUrl: './operator-class.component.html',
  styleUrls: ['./operator-class.component.scss']
})
export class OperatorClassComponent implements OnInit {
  @Input('profession') profession: string;
  @Input('subProfession') subProfession: string;
  subProfName: string;
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

  constructor(
    private opService: OpInfoService
  ) { }

  ngOnInit(): void {
    this.subProfName = this.opService.getSubProfessionById(this.subProfession)
  }

}
