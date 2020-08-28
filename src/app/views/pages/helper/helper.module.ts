import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { helperComponent } from './helper.component';
import { ModalModule } from 'ngx-bootstrap/modal';
// Material
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTabsModule,
  MatNativeDateModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatTooltipModule,
  MatExpansionModule
} from '@angular/material';

import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule, Router, Routes } from '@angular/router';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { ViewPatientsComponent } from './view-patients/view-patients.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{
  path: '',
  component: helperComponent,
  children:[
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: '',
      component: ListPatientsComponent,
    },
    {
      path: 'list/view',
      component: ViewPatientsComponent
    },
    {
      path: 'list/view/:googleId',
      component: ViewPatientsComponent
    },
   
  ]  
},]

@NgModule({
  declarations: [helperComponent, ListPatientsComponent, ViewPatientsComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    PartialsModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
  ]
})
export class helperModule { }
