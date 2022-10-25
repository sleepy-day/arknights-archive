import { Injectable } from '@angular/core';
import operatorList from '../assets/json/character_table.json';
import operatorPatchList from '../assets/json/char_patch_table.json';
import operatorMeta from '../assets/json/char_meta_table.json';

@Injectable({
  providedIn: 'root'
})
export class OpInfoService {
  constructor() { }

  getAllOperators(): object {
    return operatorList;
  }

  getOperatorDetailsFullByName(name: string): object {
    let id = "";
    let info = {};
    let altClass = {};
    let altOps: object[] = [];

    (Object.keys(operatorList) as (keyof typeof operatorList)[]).forEach((key) => {
      if (operatorList[key]["name"] === name) {
        id = key;
        info = operatorList[key];
        return;
      }
    })

    if (id === "") {
      return {};
    }

    let metaChars = operatorMeta["spCharGroups"];
    let altIds: string[] = [];

    (Object.keys(metaChars) as (keyof typeof metaChars)[]).forEach((key) => {
      if (metaChars[key].includes(id)) {
        metaChars[key].forEach((v) => {
          if (v !== id) {
            altIds.push(v);
            console.log("alternate found:", v);
          }
        })
      }
    })

    for (const s of altIds) {
      (Object.keys(operatorList) as (keyof typeof operatorList)[]).forEach((key, index) => {
        if (key === s && s !== id) {
          altOps.push(Object.values(operatorList)[index])
        }
      })
    }

    let patchChars = operatorPatchList["patchChars"];
    (Object.keys(patchChars) as (keyof typeof patchChars)[]).forEach((key) => {
      if (patchChars[key]["name"] === name) {
        altClass = { id: key, info: patchChars[key] };
        return;
      }
    })

    return {id: id, info: info, altClass: altClass, altOps: altOps};
  }

  getOperatorById(id: string): object {
    let opId = "";
    let info = {};

    (Object.keys(operatorList) as (keyof typeof operatorList)[]).forEach((key) => {
      if (key === id) {
        opId = key;
        info = operatorList[key]
        return;
      }
    })

    return { id: opId, info: info };
  }
}
