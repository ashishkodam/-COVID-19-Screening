// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';

// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
// Translate
import { TranslateService } from '@ngx-translate/core';
/**
 * ! Just example => Should be removed in development
 */


@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	hidepass: boolean;
	private unsubscribe: Subject<any>;

	private returnUrl: any;

	
	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private authNoticeService: AuthNoticeService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private translate: TranslateService
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		// this.route.queryParamMap.subscribe(param =>{
		// 	console.log(param)
		// })
		// redirect back to the returnUrl before login
		var paramData:any
		this.route.queryParams.subscribe(params => {
			 paramData= params
			this.returnUrl = params['returnUrl'] || '/';
		});
		console.log(paramData)
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Enter 
			<strong>USERNAME</strong> and 
			<strong>PASSWORD</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}

		 let loginDetails: any
		this.loginForm = this.fb.group({
			username: [loginDetails, Validators.compose([
				Validators.required,
			
			])
			],
			password: [loginDetails, Validators.compose([
				Validators.required,
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit(staticModal) {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			username: controls['username'].value,
			password: controls['password'].value
		};
		console.log(authData)
		// this.router.navigate(["/role"]);
		this.auth
			.login(authData).subscribe(res => {
				console.log(res);
				
				 if( res){
					localStorage.setItem('userDetails',JSON.stringify(res))
				 	this.store.dispatch(new Login({ authToken: res.googleId }));
				 	this.loading = false;
				 	this.authNoticeService.setNotice(this.translate.instant('Successfully login'), 'success');
					 // this.router.navigateByUrl(this.returnUrl);
					 if((res.userRole ==='guest')||(res.userRole ==='patient')){
							staticModal.show()
					}else{
						//this.showModel = true
						this.router.navigate(['/helper'])
					}
					
				}else{
					this.authNoticeService.setNotice(this.translate.instant(' INVALID LOGIN DETAILS'), 'danger');
					this.loading = false;
				}
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			},error =>{
				this.authNoticeService.setNotice(this.translate.instant('INVALID LOGIN DETAILS'), 'danger');
					this.loading = false;
			})
	}

	loginWithGoogle(staticModal){
		this.auth.loginWithGoogle()
		// .subscribe(res =>{
		// 	console.log(res.app.get('users'))
		// })
	}


	navigate(argument,staticModal){
		 switch (argument) {
			case 'test':
				
				this.router.navigate(['/dashboard']);
				staticModal.hide()
				break;
			case 'result':
				this.router.navigate(['/test-result']);
				staticModal.hide()
				break;
		
		}
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
