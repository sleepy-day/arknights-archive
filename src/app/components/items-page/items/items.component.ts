import { Component, OnInit } from '@angular/core';
import { OpInfoService } from '../../../services/op-info/op-info.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items: object;

  constructor(private opService: OpInfoService) {}

  ngOnInit(): void {
    this.items = this.opService.getAllItems();
  }
}
