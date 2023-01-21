import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-cn',
  templateUrl: './module-cn.component.html',
  styleUrls: ['./module-cn.component.scss'],
})
export class ModuleCNComponent implements OnInit {
  @Input('module') module: object;
  @Input('currModLvl') currentModuleLevel: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.module);
  }
}
