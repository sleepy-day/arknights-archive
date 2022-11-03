import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-potential',
  templateUrl: './potential.component.html',
  styleUrls: ['./potential.component.scss']
})
export class PotentialComponent implements OnInit {
  @Input('potentials') potentials: object;

  constructor() { }

  ngOnInit(): void {
  }

}
