import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { roleComponent } from './role.component';
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
import { RouterModule, Routes } from '@angular/router';
import { TestresultsComponent } from './testresults/testresults.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: roleComponent,
    children:[
      {
        path: '',
        redirectTo: 'result',
        pathMatch: 'full'
      },
      {
        path: '',
        component: ViewresultComponent,
      },
      {
        path: 'result/view',
        component: TestresultsComponent
      },
      {
        path: 'result/view/:id',
        component: TestresultsComponent
      },
     
    ]  
  }
]


@NgModule({
  declarations: [roleComponent, TestresultsComponent, ViewresultComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    PartialsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
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
]})

export class roleModule { }
