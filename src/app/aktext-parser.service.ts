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
    let regexNestedTag = RegExp(/(<\$([\w\.]+)>)((?=<@[\w\.]+)(.*?<\/>)(<\/>)|(.)?(<\/>))/);
    let regexTag = RegExp(/(<@([\w\.]+)>)(.*?)(<\/>)/);
    let regexHighlight = RegExp(/<([\w\s]*)>/);

    while (regexHighlight.exec(desc) !== null) {
      desc = desc.replace(regexHighlight, "<span class='ba.kw'>$1</span>");
    }

    while (regexNestedTag.exec(desc) !== null) {
      desc = desc.replace(regexNestedTag, "<span class='$2'>$3</span>");
    }

    while (regexTag.exec(desc) !== null) {
      desc = desc.replace(regexTag, "<span class='$2'>$3</span>");
    }
    
    return desc;
  }

}
