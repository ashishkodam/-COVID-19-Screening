// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatRadioModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
//AIzaSyBdMJIA-MA5rRAcoqrlnE_2LFtSFTWvnzw

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		MatStepperModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
		MatCheckboxModule,
		MatRadioModule,
		FormsModule,
		MatFormFieldModule,
		ModalModule.forRoot(),
		MatSelectModule,
		MatOptionModule,
		MatListModule,
		MatDividerModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
