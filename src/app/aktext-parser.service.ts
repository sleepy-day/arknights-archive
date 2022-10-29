import { Injectable } from '@angular/core';
import gameDataConst from '../assets/json/gamedata_const.json';

@Injectable({
  providedIn: 'root'
})
export class AKTextParserService {
  richTextStyles = gameDataConst["richTextStyles"];
  

  constructor() { }

  getColour(id: string): string {
    let colour = "";

    (Object.keys(this.richTextStyles) as (keyof typeof this.richTextStyles)[]).forEach((key) => {
      if (key === id) {
        let m = this.richTextStyles[key].match("#([A-F0-9]+)>")![1];
        if (!m) {
          return;
        } 
        colour = m;
        return;
      }
    })

    return colour;
  }

  parseDescription(desc: string): string {
    let regexPopUpNest = RegExp(/(<\$([\w\.]+)>)((?=<@[\w\.]+)(.*?<\/>)(<\/>)|(.)?(<\/>))/);
    let regexTag = RegExp(/(<@([\w\.]+)>)(.*?)(<\/>)/);
    let regexPopUp = RegExp(/(<\$([\w\.]+)>)(.*?)(<\/>)/);
    let regexHighlight = RegExp(/<([\w\s]*)>/);

    while (regexHighlight.exec(desc) !== null) {
      desc = desc.replace(regexHighlight, "<span class='ba.kw'>$1</span>");
    }

    while (regexPopUpNest.exec(desc) !== null) {
      let match = desc.match(regexPopUpNest);
      let termDesc = this.getTermDescription(match![2]);
      desc = desc.replace(regexPopUpNest, "<span class='tooltip'>$3<span class='tooltiptext'>" + termDesc + "</span></span>");
    }

    while (regexPopUp.exec(desc) !== null) {
      let match = desc.match(regexPopUp);
      let termDesc = this.getTermDescription(match![2]);
      desc = desc.replace(regexPopUp, "<span class='tooltip'>$3<span class='tooltiptext'>" + termDesc + "</span></span>");
    }

    while (regexTag.exec(desc) !== null) {
      desc = desc.replace(regexTag, "<span class='$2'>$3</span>");
    }
    
    return desc;
  }

  parseSkillDescription(skillInfo: object): string {
    let skill1 = RegExp(/{([@\w]*?)(?!:0%)}/g);
    let skill2 = RegExp(/{([@\w]*?):0%}/g);
    let desc: string = skillInfo["description" as keyof object];

    desc = desc.replaceAll(skill1, function(_match, g1, _offset, _string) {
      let blackboard: object[] = skillInfo["blackboard" as keyof object];
      let value: number = 0;
      for (var b of blackboard) {
        if (b["key" as keyof object] === g1) {
          value = Math.round(b["value" as keyof object]);
        }
      }
      return String(value);
    })

    desc = desc.replaceAll(skill2, function(_match, g1, _offset, _string) {
      let blackboard: object[] = skillInfo["blackboard" as keyof object];
      let value: number = 0;
      for (var b of blackboard) {
        if (b["key" as keyof object] === g1) {
          value = Math.round(b["value" as keyof object] * 100);
        }
      }
      return String(value) + "%";
    })

    return this.parseDescription(desc);
  }

  getTermDescription(term: string): string {
    let termDict = gameDataConst["termDescriptionDict"];
    let desc = "";

    (Object.keys(termDict) as (keyof typeof termDict)[]).forEach((key) => {
      if (key === term) {
        desc = termDict[key]["description"];
        return;
      }
    })

    return desc;
  }

}
