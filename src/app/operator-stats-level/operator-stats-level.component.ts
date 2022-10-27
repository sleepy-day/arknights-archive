import { Component, OnInit, Input } from '@angular/core';
const everpolate = require('everpolate');

@Component({
  selector: 'app-operator-stats-level',
  templateUrl: './operator-stats-level.component.html',
  styleUrls: ['./operator-stats-level.component.scss']
})
export class OperatorStatsLevelComponent implements OnInit {
  @Input('stats') stats: object;
  displayStats: object;
  value: number;
  minStats: object;
  maxStats: object;

  constructor() { }

  ngOnInit(): void {
    this.minStats = this.stats["attributesKeyFrames" as keyof object][0];
    this.maxStats = this.stats["attributesKeyFrames" as keyof object][1];
    this.value = 1;
    this.displayStats = {
      hp: this.stats["attributesKeyFrames" as keyof object][0]["data"]["maxHp"],
      atk: this.stats["attributesKeyFrames" as keyof object][0]["data"]["atk"],
      def: this.stats["attributesKeyFrames" as keyof object][0]["data"]["def"],
      res: this.stats["attributesKeyFrames" as keyof object][0]["data"]["magicResistance"],
      cost: this.stats["attributesKeyFrames" as keyof object][0]["data"]["cost"],
      block: this.stats["attributesKeyFrames" as keyof object][0]["data"]["blockCnt"],
      atkTime: (this.stats["attributesKeyFrames" as keyof object][0]["data"]["attackSpeed"] / 100).toFixed(1),
      respawn: this.stats["attributesKeyFrames" as keyof object][0]["data"]["respawnTime"],
    }
  }

  sliderChange(e: Event): void {
    this.value = (e.target as HTMLInputElement).valueAsNumber + 1;
    this.displayStats = {
      hp: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["maxHp"], [this.maxStats["data" as keyof object]["maxHp"]]])),
      atk: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["atk"], [this.maxStats["data" as keyof object]["atk"]]])),
      def: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["def"], [this.maxStats["data" as keyof object]["def"]]])),
      res: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                            [this.minStats["data" as keyof object]["magicResistance"], [this.maxStats["data" as keyof object]["magicResistance"]]])),
      cost: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                              [this.minStats["data" as keyof object]["cost"], [this.maxStats["data" as keyof object]["cost"]]])),
      block: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                              [this.minStats["data" as keyof object]["blockCnt"], [this.maxStats["data" as keyof object]["blockCnt"]]])),
      atkTime: (Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                                [this.minStats["data" as keyof object]["attackSpeed"], [this.maxStats["data" as keyof object]["attackSpeed"]]])) / 100).toFixed(1),
      respawn: Math.round(everpolate.linear([this.value], [this.minStats["level" as keyof object], this.maxStats["level" as keyof object]], 
                                [this.minStats["data" as keyof object]["respawnTime"], [this.maxStats["data" as keyof object]["respawnTime"]]])),
    }
  }

}
