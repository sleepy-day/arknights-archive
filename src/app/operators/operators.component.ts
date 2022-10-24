import { Component, OnInit } from '@angular/core';
import { OpInfoService } from '../op-info.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {  
  operators = this.opService.getAllOperators();
  
  constructor(private opService: OpInfoService) { }

  ngOnInit(): void {
    console.log(this.operators)
  }

}
