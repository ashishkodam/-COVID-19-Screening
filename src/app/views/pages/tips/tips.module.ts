import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsComponent } from './tips.component';
import { MatDividerModule, MatListModule } from '@angular/material';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TipsComponent],
  imports: [
    CommonModule,
    PartialsModule,
		CoreModule,
    MatDividerModule,
    MatListModule,
    RouterModule.forChild([
			{
				path: '',
				component: TipsComponent
			},
		]),
  ]
})
export class TipsModule { }
