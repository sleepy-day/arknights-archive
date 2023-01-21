import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-en',
  templateUrl: './module-en.component.html',
  styleUrls: ['./module-en.component.scss'],
})
export class ModuleENComponent implements OnInit {
  @Input('module') module: object;
  @Input('currModLvl') currentModuleLevel: number;

  constructor() {}

  ngOnInit(): void {}
}
