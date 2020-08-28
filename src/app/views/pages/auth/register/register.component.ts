// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';


import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthNoticeService, AuthService } from '../../../../core/auth';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	// @ViewChild("map", { static: false }) mapElement: ElementRef;
	// map: google.maps.Map;
	// infoWindow = new google.maps.InfoWindow;
	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Enter  details to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}
		this.registerForm = this.fb.group({
			firstName: ['', Validators.compose([
				Validators.required,
			])
			],
			lastName: ['', Validators.compose([
				Validators.required,
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
			]),
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8)
			])
			],
			phone: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(10)
			])
			],
			userRole:['',Validators.compose([
				Validators.required,
			])],
			
			agree: [false, Validators.compose([Validators.required])]
		},);
	}

	/**
	 * Form Submit
	 */
	submit() {
		console.log("erfser")
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		// if (!controls['agree'].value) {
		// 	// you must agree the terms and condition
		// 	// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
		// 	this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
		// 	return;
		// }

		const _user = {
		
		email : controls['email'].value,
		userName : controls['username'].value,
		firstName : controls['firstName'].value,
		lastName:controls['lastName'].value,
		password : controls['password'].value,
		userRole : controls['userRole'].value,
		phone:controls['phone'].value,
		
		// location:{
		// 	lat:this.latitude,
		// 	long:this.longitude
		// },
		// covidTest:[],
		// createdOn:new Date(),
		// updatedOn:new Date()
		}
		console.log(_user)
		this.auth.register(_user).subscribe(user => {
			console.log(user)
				if (user) {

					// pass notice message to the login page
					this.authNoticeService.setNotice(this.translate.instant('Succcessfully Registered'), 'success');
					this.loading = false;
					this.router.navigateByUrl('/auth/login');
				} else {
					this.loading = false;
					this.authNoticeService.setNotice(this.translate.instant('Pleace check entered details'), 'danger');
				}
			}, (error) =>{
				this.loading = false;
				this.authNoticeService.setNotice(this.translate.instant('Pleace check entered details'), 'danger');
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	
}
