import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { LayoutUtilsService } from '../../../../core/_base/crud';
import { SubheaderService } from '../../../../core/_base/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {} from 'googlemaps';

@Component({
  selector: 'kt-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss'],

})
export class ViewPatientsComponent implements OnInit {
  @ViewChild("map", { static: false }) mapElement: ElementRef;
	map: google.maps.Map;
	infoWindow = new google.maps.InfoWindow();
  userDetails: any;
selectedTab: number = 0;
loadingSubject = new BehaviorSubject<boolean>(true);
loading$: Observable<boolean>;
hasFormErrors: boolean = false;
filteredColors: Observable<string[]>;
filteredManufactures: Observable<string[]>;
// Private password
private componentSubscriptions: Subscription;
// sticky portlet header margin
private headerMargin: number;
public loader: boolean = true
userid: number;


/**
 * Component constructor
 *

 * @param activatedRoute: ActivatedRoute
 * @param router: Router
 * @param typesUtilsService: TypesUtilsService
 * @param productFB: FormBuilder
 * @param dialog: MatDialog
 * @param subheaderService: SubheaderService
 * @param layoutUtilsService: SubheaderService
 * @param layoutConfigService: LayoutConfigService
 * @param userService: AllSerives
 * @param cdr: ChangeDetectorRef
 */
constructor(
  //private store: Store<AppState>,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  
  private subheaderService: SubheaderService,
  private layoutUtilsService: LayoutUtilsService,
  private userService: CovidService,
  private cdr: ChangeDetectorRef) {
}

/**
 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
 */

/**
 * On init
 */
ngOnInit() {
  this.loading$ = this.loadingSubject.asObservable();
  this.loadingSubject.next(false);
  this.activatedRoute.params.subscribe(params => {
    this.userid = params['googleId'];
    console.log(typeof(this.userid))
      this.userService.getUserById(this.userid)
        .subscribe(
          result => {
            console.log(result)
            this.userDetails = result;
            this.cdr.markForCheck()
           
          })
   
  });

  // sticky portlet header
  window.onload = () => {
    const style = getComputedStyle(document.getElementById('kt_header'));
    this.headerMargin = parseInt(style.height, 0);
  };
}


openMap(userLocation,lgModal){
  var location = {lat:32.326595,lng:-106.775436}
	    let mapProperties = {
	      center: location,
	      zoom: 12,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	 };
	    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
	    let marker = new google.maps.Marker({
	      position:location,map:this.map})
  lgModal.show()
}


loadUser(_user, fromService: boolean = false) {
 
  if (_user.googoogleId) {
    this.userDetails = _user;
    console.log(this.userDetails)
    this.cdr.markForCheck();
    this.loader = false

    this.initUser();
    if (fromService) {
      this.cdr.markForCheck();
    }
  }
  
}

// If user didn't find in store
loadUserFromService(userId) {
  this.userService.getUserById(userId).subscribe(res => {
    this.loadUser(res, true);
    
  });
}

/**
 * On destroy
 */
ngOnDestroy() {
  if (this.componentSubscriptions) {
    this.componentSubscriptions.unsubscribe();
  }
}

/**
 * Init User
 */
initUser() {
  this.loadingSubject.next(false);
  if (!this.userDetails) {
    this.subheaderService.setTitle('View user');
    this.subheaderService.setBreadcrumbs([
      { title: 'Users', page: `/list` },
      { title: 'User', page: `/list/view` },
      { title: 'View User', page: `/list/view`, queryParams: { id: this.userDetails.id } }
  
    ]);
    return;
  }
 
  
}



goBackWithoutId() {
  this.router.navigateByUrl('/users', { relativeTo: this.activatedRoute });
}


/**
 * Returns component title
 */
getComponentTitle() {
  let result = 'Create User';
  if (!this.userDetails || !this.userDetails.id) {
    return result;
  }

  result = `Edit User Details - ${this.userDetails.firstName}`;
  return result;
}

/**
 * Close alert
 *
 * @param $event
 */
onAlertClose($event) {
  this.hasFormErrors = false;
}

}
