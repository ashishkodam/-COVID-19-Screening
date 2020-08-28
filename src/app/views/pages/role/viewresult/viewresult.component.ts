import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LayoutUtilsService } from '../../../../core/_base/crud';
import { CovidService } from '../../services/covid.service';
@Component({
  selector: 'kt-viewresult',
  templateUrl: './viewresult.component.html',
  styleUrls: ['./viewresult.component.scss']
})
export class ViewresultComponent implements OnInit {
  public userDetails :any;
  public listOfTest =[];
  displayedColumns = ['no', 'username', 'urole'];
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
    let locadata = JSON.parse(localStorage.getItem("userDetails"));
    console.log(locadata.googleId)
    this.service.getUserById(locadata.googleId).subscribe(res =>{
      this.userDetails = res
      console.log(this.userDetails);
      this.listOfTest = this.userDetails.covidTest
      this.loader = false
      this.cdr.markForCheck()
    })
  }


  
  view(){
   
     this.router.navigate(['result/view', this.userDetails.googleId], { relativeTo: this.activatedRoute });
  }
}
