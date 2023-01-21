import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperatorsComponent } from './components/operators-page/operators/operators.component';
import { OperatorComponent } from './components/operator-page/operator/operator.component';
import { OperatorStatsComponent } from './components/operator-page/stats/operator-stats/operator-stats.component';
import { OperatorStatsLevelComponent } from './components/operator-page/stats/operator-stats-level/operator-stats-level.component';
import { OperatorSkillsComponent } from './components/operator-page/skills/operator-skills/operator-skills.component';
import { ItemsComponent } from './components/items-page/items/items.component';
import { OperatorSkillsLevelComponent } from './components/operator-page/skills/operator-skills-level/operator-skills-level.component';
import { NavbarComponent } from './components/shared-components/navbar/navbar.component';
import { PotentialComponent } from './components/operator-page/misc-info/potential/potential.component';
import { OperatorClassComponent } from './components/operator-page/misc-info/operator-class/operator-class.component';
import { OperatorVisualDisplayComponent } from './components/operator-page/misc-info/operator-visual-display/operator-visual-display.component';
import { TagListComponent } from './components/operator-page/misc-info/tag-list/tag-list.component';
import { OperatorSkillsCostComponent } from './components/operator-page/skills/operator-skills-cost/operator-skills-cost.component';
import { OperatorLevelCostComponent } from './components/operator-page/stats/operator-level-cost/operator-level-cost.component';
import { TalentsComponent } from './components/operator-page/misc-info/talents/talents.component';
import { ModulesComponent } from './components/operator-page/misc-info/modules/modules.component';
import { ModuleDescriptionComponent } from './components/operator-page/misc-info/modules/module-description/module-description.component';
import { RangeDisplayComponent } from './components/operator-page/misc-info/range-display/range-display.component';
import { ModuleENComponent } from './components/operator-page/misc-info/modules/module-en/module-en.component';
import { ModuleCNComponent } from './components/operator-page/misc-info/modules/module-cn/module-cn.component';
import { ModuleStatsComponent } from './components/operator-page/misc-info/modules/module-stats/module-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    OperatorsComponent,
    OperatorComponent,
    OperatorStatsComponent,
    OperatorStatsLevelComponent,
    OperatorSkillsComponent,
    ItemsComponent,
    OperatorSkillsLevelComponent,
    NavbarComponent,
    PotentialComponent,
    OperatorClassComponent,
    OperatorVisualDisplayComponent,
    TagListComponent,
    OperatorSkillsCostComponent,
    OperatorLevelCostComponent,
    TalentsComponent,
    ModulesComponent,
    ModuleDescriptionComponent,
    RangeDisplayComponent,
    ModuleENComponent,
    ModuleCNComponent,
    ModuleStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
