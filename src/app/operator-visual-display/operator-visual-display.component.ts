import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operator-visual-display',
  templateUrl: './operator-visual-display.component.html',
  styleUrls: ['./operator-visual-display.component.scss']
})
export class OperatorVisualDisplayComponent implements OnInit {
  @Input('operator') operator: object;
  @Input('powerId') powerId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
