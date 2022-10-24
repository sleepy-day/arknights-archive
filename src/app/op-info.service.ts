import { Injectable } from '@angular/core';
import operatorList from '../assets/json/character_table.json';

@Injectable({
  providedIn: 'root'
})
export class OpInfoService {
  constructor() { }

  getAllOperators(): object {
    return operatorList;
  }

  getOperatorByName(name: string): object {
    let op = {};
    (Object.keys(operatorList) as (keyof typeof operatorList)[]).forEach((key, index) => {
      if (operatorList[key]["name"] === name) {
        op = operatorList[key];
        return
      }
    })

    return op;
  }
}
