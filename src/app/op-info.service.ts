import { Injectable } from '@angular/core';
import operatorList from '../assets/json/character_table.json';
import operatorPatchList from '../assets/json/char_patch_table.json';
import operatorMeta from '../assets/json/char_meta_table.json';
import teamHandbook from '../assets/json/handbook_team_table.json';
import uniEquip from '../assets/json/uniequip_table.json';
import itemTable from '../assets/json/item_table.json';
import skillTable from '../assets/json/skill_table.json';

@Injectable({
  providedIn: 'root'
})
export class OpInfoService {
  altClassOps: string[] = ["Amiya"];
  constructor() { }

  getAllOperators(): object {
    return operatorList;
  }

  getOperatorByName(name: string): object {
    let id = "";
    let info = {};

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

    return { id: id, info: info };
  }

  getOperatorAlterById(id: string): object[] {
    let altOps: object[] = [];
    let metaChars = operatorMeta["spCharGroups"];
    let altIds: string[] = [];

    (Object.keys(metaChars) as (keyof typeof metaChars)[]).forEach((key) => {
      if (metaChars[key].includes(id)) {
        metaChars[key].forEach((v) => {
          if (v !== id) {
            altIds.push(v);
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

    return altOps;
  }

  getOperatorAltClassByName(name: string): object[] {
    if (this.altClassOps.includes(name)) {
      let altClass: object[] = [];
      let patchChars = operatorPatchList["patchChars"];
      (Object.keys(patchChars) as (keyof typeof patchChars)[]).forEach((key) => {
        if (patchChars[key]["name"] === name) {
          altClass.push({ id: key, info: patchChars[key] });
        }
      })

      return altClass;
    } else {
      return [];
    }
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

  getGroupById(operator: object): object {
    let group = {};
    let id = "";
    if (operator["teamId" as keyof object] !== null) {
      id = operator["teamId" as keyof object];
    } else if (operator["groupId" as keyof object] !== null) {
      id = operator["groupId" as keyof object];
    } else {
      id = operator["nationId" as keyof object];
    }

    (Object.keys(teamHandbook) as (keyof typeof teamHandbook)[]).forEach((key) => {
      if (key === id) {
        group = teamHandbook[key];
        return;
      }
    })

    return group;
  }

  getSubProfessionById(id: string): string {
    let subProf = "";

    let subProfDict = uniEquip["subProfDict"];
    (Object.keys(subProfDict) as (keyof typeof subProfDict)[]).forEach((key) => {
      if (key === id) {
        subProf = subProfDict[key]["subProfessionName"];
        return;
      }
    })

    return subProf;
  }

  parseTextToHtml(text: string): string {
    return "";
  }

  getAllItems(): object {
    return itemTable["items"];
  }

  listAllSkillKeys(): string[] {
    let uniqueKeys: string[] = [];

    (Object.keys(skillTable) as (keyof typeof skillTable)[]).forEach((key) => {
      let levels: object[] = skillTable[key]["levels"];
      for (var level of levels) {
        let blackboard: object[] = level["blackboard" as keyof object];
        for (var b of blackboard) {
          if (!uniqueKeys.includes(b["key" as keyof object])) {
            uniqueKeys.push(b["key" as keyof object]);
          }
        }
      }
    })

    return uniqueKeys;
  }

  getSkillInfoById(id: string): object {
    let skillInfo: object = {};

    (Object.keys(skillTable) as (keyof typeof skillTable)[]).forEach((key) => {
      if (key === id) {
        skillInfo = skillTable[key];
      }
    })

    return skillInfo;
  }

}
