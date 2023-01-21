import { Component, OnInit } from '@angular/core';
import { OpInfoService } from '../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
  operatorNames = this.opService.getAllOperatorNames();
  search: string = '';

  constructor(private opService: OpInfoService) {}

  ngOnInit(): void {}
}
