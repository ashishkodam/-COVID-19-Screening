import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LayoutUtilsService } from '../../../../core/_base/crud';
import { CovidService } from '../../services/covid.service';
@Component({
  selector: 'kt-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {

  public userDetails :any;
  public listOfTest =[];
  displayedColumns = ['no', 'username', 'urole',  'actions'];
  public loader :boolean = true;
  public isdisabled:boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private layoutUtilsService: LayoutUtilsService,
    private service:CovidService,
    private subheaderService: SubheaderService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getUserDetails();
   
  }
  getUserDetails(){
    this.service.getPatients().subscribe(res =>{
      console.log(res)
      this.userDetails = res
      console.log(this.userDetails);
      this.loader = false
      this.cdr.markForCheck()
    })
  }


  
  view(googleId){
    this.router.navigate(['list/view', googleId], { relativeTo: this.activatedRoute });
  }

}
