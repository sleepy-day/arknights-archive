import { Injectable } from '@angular/core';
import operatorList from '../../../assets/json/character_table.json';
import operatorListCN from '../../../assets/json/cn/character_table.json';
import operatorPatchList from '../../../assets/json/char_patch_table.json';
import operatorMeta from '../../../assets/json/char_meta_table.json';
import teamHandbook from '../../../assets/json/handbook_team_table.json';
import teamHandbookCN from '../../../assets/json/cn/handbook_team_table.json';
import equipTable from '../../../assets/json/uniequip_table.json';
import equipTableCN from '../../../assets/json/cn/uniequip_table.json';
import battleEquipTable from '../../../assets/json/battle_equip_table.json';
import battleEquipTableCN from '../../../assets/json/cn/battle_equip_table.json';
import itemTable from '../../../assets/json/item_table.json';
import skillTable from '../../../assets/json/skill_table.json';
import skillTableCN from '../../../assets/json/cn/skill_table.json';
import rangeTable from '../../../assets/json/range_table.json';
import skinsTable from '../../../assets/json/skin_table.json';
import skinsTableCN from '../../../assets/json/cn/skin_table.json';

@Injectable({
  providedIn: 'root'
})

export class OpInfoService {
  altClassOps: string[] = ["Amiya"];
  constructor() { }

  getAllOperators(): object {
    return operatorListCN;
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
      (Object.keys(operatorListCN) as (keyof typeof operatorListCN)[]).forEach((key) => {
        if (operatorListCN[key]["appellation"] === name) {
          id = key;
          info = operatorListCN[key];
          return;
        }
      })
    }

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

    if (opId === "") {
      (Object.keys(operatorListCN) as (keyof typeof operatorListCN)[]).forEach((key) => {
        if (key === id) {
          opId = key;
          info = operatorListCN[key];
          return;
        }
      })
    }

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

    if (!group) {
      (Object.keys(teamHandbookCN) as (keyof typeof teamHandbookCN)[]).forEach((key) => {
        if (key === id) {
          group = teamHandbookCN[key];
          return;
        }
      })
    }

    console.log(group);
    return group;
  }

  getSubProfessionById(id: string): string {
    let subProf = "";

    let subProfDict = equipTable["subProfDict"];
    (Object.keys(subProfDict) as (keyof typeof subProfDict)[]).forEach((key) => {
      if (key === id) {
        subProf = subProfDict[key]["subProfessionName"];
        return;
      }
    })

    return subProf;
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
        return;
      }
    })

    if (Object.keys(skillInfo).length === 0) {
      (Object.keys(skillTableCN) as (keyof typeof skillTableCN)[]).forEach((key) => {
        if (key === id) {
          skillInfo = skillTableCN[key];
          return;
        }
      })
    }

    console.log(skillInfo);

    return skillInfo;
  }

  getRangeInfo(id: string): number[][] {
    let grids: object[] = [];
    let rangeLayout: number[][] = [];

    (Object.keys(rangeTable) as (keyof typeof rangeTable)[]).forEach((key) => {
      if (key === id) {
        grids = rangeTable[key]["grids"];
        return;
      }
    })

    let minRow: number = 0; let maxRow: number = 0;
    let minCol: number = 0; let maxCol: number = 0;
    
    for (let grid of grids) {
      if (grid["row" as keyof object] > maxRow) { maxRow = grid["row" as keyof object]; }
      if (grid["row" as keyof object] < minRow) { minRow = grid["row" as keyof object]; }
      if (grid["col" as keyof object] > maxCol) { maxCol = grid["col" as keyof object]; }
      if (grid["col" as keyof object] < minCol) { minCol = grid["col" as keyof object]; }
    }

    let rowCount = Math.abs(minRow) + maxRow + 1;
    let colCount = Math.abs(minCol) + maxCol + 1;
    
    for (let i = 0; i < rowCount; i++) {
      rangeLayout.push(Array(colCount).fill(0));
    }

    for (let grid of grids) {
      let currRow = grid["row" as keyof object];
      let currCol = grid["col" as keyof object];

      rangeLayout[currRow + Math.abs(minRow)][currCol + Math.abs(minCol)] = 1;
    }

    rangeLayout[Math.abs(minRow)][Math.abs(minCol)] = 2;

    return rangeLayout;
  }

  getItemById(id: string): object {
    let item: object = {};
    let items = itemTable["items"];

    (Object.keys(items) as (keyof typeof items)[]).forEach((key) => {
      if (key === id) {
        item = items[id];
        return;
      }
    })

    return item;
  }

  getSkinsForOperator(id: string): object[] {
    let skins: object[] = [];
    let charSkins = skinsTableCN["charSkins" as keyof object];
    let defaultSkinIds: string[] = ["ILLUST_0", "ILLUST_1", "ILLUST_2"];

    (Object.keys(charSkins) as (keyof typeof charSkins)[]).forEach((key) => {
      if (charSkins[key]["charId"] === id && !defaultSkinIds.includes(charSkins[key]["displaySkin"]["skinGroupId"])) {
        skins.push(charSkins[key]);
      }
    })

    return skins;
  }

  getBrandForSkin(skinGroupId: string): string {
    let brands = skinsTableCN["brandList"];
    let brand = "";

    (Object.keys(brands) as (keyof typeof brands)[]).forEach((key) => {
      if (brands[key]["groupList"].includes(skinGroupId)) {
        brand = key;
        return;
      }
    })

    return brand;
  }

  getItemsForSkillCost(costs: object[][]): object[] {
    let items: object[] = []
    let allItems = itemTable["items"];

    for (let cost of costs) {
      let entry: object[] = [];

      (Object.keys(allItems) as (keyof typeof allItems)[]).forEach((key) => {
        for (let item of cost) {
          if (allItems[key]["itemId"] === item["id" as keyof object]) {
            entry.push({ item: allItems[key], count: item["count" as keyof object] });
          }
        }
      }) 

      items.push({ items: entry });
    }

    return items;
  }

  getModulesForOperator(id: string): object {
    let defaultModule: object = {};
    let moduleInfo: object[] = [];
    let equipDict = equipTable["equipDict" as keyof object];
    let equipDictCN = equipTableCN["equipDict" as keyof object];


    (Object.keys(equipDictCN) as (keyof typeof equipDict)[]).forEach((key) => {
      if (equipDictCN[key]["charId"] === id) {
        if (equipDictCN[key]["type"] === "INITIAL") {
          defaultModule = equipDict[key];
        } else {
          moduleInfo.push({ 
            details: equipDict[key as keyof object], 
            detailsCN: equipDictCN[key], 
            battleDetails: battleEquipTable[key as keyof object], 
            battleDetailsCN: battleEquipTableCN[key as keyof object] 
          });
        }
      }
    })

    return { defModule: defaultModule, modInfo: moduleInfo };
  }

}
