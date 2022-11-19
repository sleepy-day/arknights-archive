import { Injectable } from '@angular/core';
import gameDataConst from '../../../assets/json/gamedata_const.json';

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
      desc = desc.replace(regexHighlight, "<div class='ba.kw hl'>$1</div>");
    }

    while (regexPopUpNest.exec(desc) !== null) {
      let match = desc.match(regexPopUpNest);
      let termDesc = this.getTermDescription(match![2]);
      desc = desc.replace(regexPopUpNest, "<div class='tooltip hl'>$3<div class='tooltiptext hl'>" + termDesc + "</div></div>");
    }

    while (regexPopUp.exec(desc) !== null) {
      let match = desc.match(regexPopUp);
      let termDesc = this.getTermDescription(match![2]);
      desc = desc.replace(regexPopUp, "<div class='tooltip hl'>$3<div class='tooltiptext hl'>" + termDesc + "</div></div>");
    }

    while (regexTag.exec(desc) !== null) {
      desc = desc.replace(regexTag, "<div class='$2 hl'>$3</div>");
    }
    
    return desc;
  }

  parseSkillDescription(skillInfo: object): string {
    let skill1 = RegExp(/{(-?[@\w\.\[\]]*?)(?!:0)}/g);
    let skill2 = RegExp(/{(-?[@\w\.\[\]]*?):0(%)?}/g);
    let skill3 = RegExp(/{(-?[@\w\.\[\]]*?):0.0(%)?}/g);
    let desc: string = skillInfo["description" as keyof object];

    desc = desc.replaceAll(skill1, function(_match, g1, _offset, _string) {
      let blackboard: object[] = skillInfo["blackboard" as keyof object];
      let value: number = 0;
      let key: string = g1;
      let negative: boolean = false;

      if (key.charAt(0) === "-") {
        key = key.substring(1);
        negative = true;
      }

      for (var b of blackboard) {
        let objectKey: string = b["key" as keyof object];
        if (objectKey.toLowerCase() === key.toLowerCase()) {
          if (negative) {
            value = Math.round(Math.abs(b["value" as keyof object] * 100));
          } else {
            value = Math.round(b["value" as keyof object]);
          }
        }
      }

      return String(value);
    })

    desc = desc.replaceAll(skill2, function(_match, g1, g2, _offset, _string) {
      let blackboard: object[] = skillInfo["blackboard" as keyof object];
      let value: string = "";
      let key: string = g1;
      let negative: boolean = false;

      if (key.charAt(0) === "-") {
        key = key.substring(1);
        negative = true;
      }

      for (var b of blackboard) {
        let objectKey: string = b["key" as keyof object];
        if (objectKey.toLowerCase() === key.toLowerCase()) {
          if (negative) {
            if (g2 === "%") {
              value = String(Math.round(Math.abs(b["value" as keyof object] * 100))) + g2;
            } else {
              value = String(Math.round(Math.abs(b["value" as keyof object])));
            }
          } else {
            if (g2 === "%") {
              value = String(Math.round(b["value" as keyof object] * 100)) + g2;
            } else {
              value = String(Math.round(b["value" as keyof object]));
            }
          }
        }
      }

      return value;
    })

    desc = desc.replaceAll(skill3, function(_match, g1, g2, _offset, _string) {
      let blackboard: object[] = skillInfo["blackboard" as keyof object];
      let value: string = "";
      let key: string = g1;
      let negative: boolean = false;

      if (key.charAt(0) === "-") {
        key = key.substring(1);
        negative = true;
      }

      for (var b of blackboard) {
        let objectKey: string = b["key" as keyof object];
        if (objectKey.toLowerCase() === key.toLowerCase()) {
          if (negative) {
            if (g2 === "%") {
              value = String((Math.abs(b["value" as keyof object] * 100)).toFixed(1)) + g2;
            } else {
              value = String(Math.abs(b["value" as keyof object]));
            }
          } else {
            if (g2 === "%") {
              value = String((b["value" as keyof object] * 100).toFixed(1)) + g2;
            } else {
              value = String(b["value" as keyof object]);
            }
          }
        }
      }

      return value;
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
