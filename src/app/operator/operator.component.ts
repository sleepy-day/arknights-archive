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
  operator: object

  constructor(
    private route: ActivatedRoute,
    private opService: OpInfoService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    this.route.params.subscribe(params => {
      let name = params['opName']
      console.log("ee:", name)
      this.operator = this.opService.getOperatorDetailsFullByName(name)
      console.log(this.operator)
    })
  }

  parseDescription(desc: string) {
    const r = new RegExp('(<@ba\.kw>)(.*)(<\/>)')
    desc.replace(r, "<span class='highlight'>$2<\/span>")
    console.log(desc)
    return desc.replace(r, "<span class='highlight'>$2<\/span>")
  }

}
