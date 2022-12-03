import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-stats',
  templateUrl: './module-stats.component.html',
  styleUrls: ['./module-stats.component.scss']
})
export class ModuleStatsComponent implements OnInit {
  @Input("attributes") attributes: object[];

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

  constructor() { }

  ngOnInit(): void {
  }

}
