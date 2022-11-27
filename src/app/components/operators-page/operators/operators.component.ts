import { Component, OnInit } from '@angular/core';
import { OpInfoService } from '../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {  
  operators = this.opService.getAllOperators();
  search: string = "";
  
  constructor(private opService: OpInfoService) { }

  ngOnInit(): void {
    console.log(this.operators)
    console.log(this.search);
  }

  logChange(): void {
    console.log(this.search);
  }

}
