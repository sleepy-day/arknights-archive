import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AKTextParserService } from 'src/app/services/ak-text-parser/aktext-parser.service';

@Component({
  selector: 'app-module-description',
  templateUrl: './module-description.component.html',
  styleUrls: ['./module-description.component.scss']
})
export class ModuleDescriptionComponent implements OnInit {
  @Input('fieldName') fieldName: string;
  @Input('desc') desc: string;
  @Input('blackboard') blackboard: object[];

  constructor(
    public sanitizer: DomSanitizer,
    private textParser: AKTextParserService,
  ) { }

  ngOnInit(): void {
  }

  parseDescriptionValues(desc: string, blackboard: object[]): string {
    return this.textParser.parseValuesInDescription(desc, blackboard);
  }

}
