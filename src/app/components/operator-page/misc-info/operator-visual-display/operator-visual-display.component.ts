import { Component, OnInit, Input } from '@angular/core';
import { OpInfoService } from '../../../../services/op-info/op-info.service';

@Component({
  selector: 'app-operator-visual-display',
  templateUrl: './operator-visual-display.component.html',
  styleUrls: ['./operator-visual-display.component.scss'],
})
export class OperatorVisualDisplayComponent implements OnInit {
  @Input('operator') operator: object;
  @Input('powerId') powerId: string;
  imgList: string[] = [];
  imageName: string;
  imgDirectory: string;
  skins: object[];

  constructor(private opService: OpInfoService) {}

  ngOnInit(): void {
    this.imageName = this.operator['id' as keyof object] + '_1';
    this.imgDirectory = 'operators';
    this.skins = this.opService.getSkinsForOperator(
      this.operator['id' as keyof object]
    );
    this.preloadImages();
  }

  getOpEvoImg(lvl: number): void {
    this.imgDirectory = 'operators';
    if (lvl === 0) {
      this.imageName = this.operator['id' as keyof object] + '_1';
    } else if (lvl === 1) {
      this.imageName = this.operator['id' as keyof object] + '_1+';
    } else if (lvl === 2) {
      this.imageName = this.operator['id' as keyof object] + '_2';
    }
  }

  getSkinImg(img: string): void {
    let r = RegExp(/#/g);
    img = img.replaceAll(r, '%23');
    this.imgDirectory = 'skins';
    this.imageName = img;
  }

  getSkinBrandIcon(skin: object): string {
    return this.opService.getBrandForSkin(
      skin['displaySkin' as keyof object]['skinGroupId']
    );
  }

  preloadImages(): void {
    let id = this.operator['id' as keyof object];
    if (this.operator['info' as keyof object]['name'] === 'Amiya') {
      this.imgList.push(
        ...[
          '/assets/img/operators/' + id + '_1.png',
          '/assets/img/operators/' + id + '_1+.png',
          '/assets/img/operators/' + id + '_2.png',
        ]
      );
    } else if (this.operator['info' as keyof object]['rarity'] > 2) {
      this.imgList.push(
        ...[
          '/assets/img/operators/' + id + '_1.png',
          '/assets/img/operators/' + id + '_2.png',
        ]
      );
    } else {
      this.imgList.push('/assets/img/operators/' + id + '_1.png');
    }

    let r = RegExp(/#/g);
    for (let skin of this.skins) {
      let skinName: string = skin['avatarId' as keyof object];
      skinName = skinName.replaceAll(r, '%23');
      this.imgList.push('/assets/img/skins/' + skinName + '.png');
    }
  }
}
