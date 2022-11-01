import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../op-info.service';

const everpolate = require('everpolate');

@Component({
  selector: 'app-operator-stats-level',
  templateUrl: './operator-stats-level.component.html',
  styleUrls: ['./operator-stats-level.component.scss']
})
export class OperatorStatsLevelComponent implements OnInit {
  @Input('stats') stats: object;
  displayStats: object;
  level: number;
  minStats: object;
  maxStats: object;
  rangeGrid: number[][];

  constructor(
    private opService: OpInfoService,
  ) { }

  ngOnInit(): void {
    this.rangeGrid = this.opService.getRangeInfo(this.stats["rangeId" as keyof object]);
    this.minStats = this.stats["attributesKeyFrames" as keyof object][0];
    this.maxStats = this.stats["attributesKeyFrames" as keyof object][1];
    this.level = 1;
    this.updateStats();
  }

  updateStats(): void {
    this.displayStats = {
      hp: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["maxHp"], [this.maxStats["data" as keyof object]["maxHp"]]])),
      atk: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["atk"], [this.maxStats["data" as keyof object]["atk"]]])),
      def: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["def"], [this.maxStats["data" as keyof object]["def"]]])),
      res: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["magicResistance"], [this.maxStats["data" as keyof object]["magicResistance"]]])),
      cost: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                              [this.minStats["data" as keyof object]["cost"], [this.maxStats["data" as keyof object]["cost"]]])),
      block: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                              [this.minStats["data" as keyof object]["blockCnt"], [this.maxStats["data" as keyof object]["blockCnt"]]])),
      atkTime: (Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                                [this.minStats["data" as keyof object]["attackSpeed"], [this.maxStats["data" as keyof object]["attackSpeed"]]])) / 100).toFixed(1),
      respawn: Math.round(everpolate.linear([this.level], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                                [this.minStats["data" as keyof object]["respawnTime"], [this.maxStats["data" as keyof object]["respawnTime"]]])),
    }
  }

}
