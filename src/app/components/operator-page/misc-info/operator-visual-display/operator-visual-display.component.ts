import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operator-visual-display',
  templateUrl: './operator-visual-display.component.html',
  styleUrls: ['./operator-visual-display.component.scss']
})
export class OperatorVisualDisplayComponent implements OnInit {
  @Input('operator') operator: object;
  @Input('powerId') powerId: string;
  imageName: string;
  imgDirectory: string;
  skins: object[];

  constructor(
    private opService: OpInfoService
  ) { }

  ngOnInit(): void {
    this.imageName = this.operator["id" as keyof object] + "_1";
    this.imgDirectory = "operators";
    this.skins = this.opService.getSkinsForOperator(this.operator["id" as keyof object]);
    console.log(this.skins)
  }

  getOpEvoImg(lvl: number): void {
    this.imgDirectory = "operators";
    if (lvl === 0) {
      this.imageName = this.operator["id" as keyof object] + "_1";
    } else if (lvl === 1) {
      this.imageName = this.operator["id" as keyof object] + "_1+";
    } else if (lvl === 2) {
      this.imageName = this.operator["id" as keyof object] + "_2";
    }
  }

  getSkinImg(img: string): void {
    let r = RegExp(/#/g)
    img = img.replaceAll(r, "%23");
    this.imgDirectory = "skins";
    this.imageName = img;
  }

  getSkinBrandIcon(skin: object): string {
    return this.opService.getBrandForSkin(skin["displaySkin" as keyof object]["skinGroupId"]);
  }

}
