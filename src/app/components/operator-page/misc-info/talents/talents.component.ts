import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AKTextParserService } from 'src/app/services/ak-text-parser/aktext-parser.service';

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrls: ['./talents.component.scss']
})
export class TalentsComponent implements OnInit {
  @Input('talents') talents: object[];
  talentLevels: object[] = [];
  currentLevel: number[] = [];
  evoIncrements: number[] = [];
  potIncrements: number[] = [];
  potToggled: boolean[] = [];
  activeButton: number[] = [];

  constructor(
    private textParser: AKTextParserService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getTalentLevels();
    this.getIncrements();
  }

  getTalentLevels(): void {
    for (let talent of this.talents) {
      let evo: number[] = [];
      let pot: number = 0;
      let candidates: object[] = talent["candidates" as keyof object]; 
      
      for (let candidate of candidates) {
        let c = candidate["unlockCondition" as keyof object];

        if (!evo.some((e) => JSON.stringify(e) === JSON.stringify(c))) {
          evo.push(c);
        }
        if (+candidate["requiredPotentialRank" as keyof object] > 0) {
          pot = +candidate["requiredPotentialRank" as keyof object];
        }
      }

      this.talentLevels.push( { evo: evo, potential: pot } );
    }
  }

  getIncrements(): void {
    let index = 0;
    for (let talent of this.talents) {
      let evo: object[] = this.talentLevels[index]["evo" as keyof object];
      let candidates: object[] = talent["candidates" as keyof object];
      this.evoIncrements.push(candidates.length / evo.length);

      if (this.talentLevels[index]["potential" as keyof object] > 0) {
        this.potIncrements.push(1);
      } else {
        this.potIncrements.push(0);
      }

      this.potToggled.push(false);
      this.activeButton.push(evo.length - 1);
      this.currentLevel.push(candidates.length - this.potIncrements[index] - 1);
      index++;
    }
  }

  changeSelectedTalent(talent: number, level: number): void {
    if (this.potToggled[talent]) {
      this.currentLevel[talent] = level * this.evoIncrements[talent] + this.potIncrements[talent];
    } else {
      this.currentLevel[talent] = level * this.evoIncrements[talent];
    }
    this.activeButton[talent] = level;
  }

  togglePotential(talent: number): void {
    this.potToggled[talent] = !this.potToggled[talent];
    if (this.potToggled[talent]) {
      this.currentLevel[talent] += 1;
    } else {
      this.currentLevel[talent] -= 1;
    }
  }

  parseDescription(desc: string) {
    return this.textParser.parseDescription(desc);
  }

}
