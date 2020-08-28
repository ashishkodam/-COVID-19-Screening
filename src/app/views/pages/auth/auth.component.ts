// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CovidService } from '../services/covid.service';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;
	firstFormGroupQuestions: FormGroup;
	casesData: any;
	country= 'usa';

	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		public covidService:CovidService,
		private _formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef,
		private splashScreenService: SplashScreenService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		
		this.headerLogo = this.layoutConfigService.getLogo();

		this.splashScreenService.hide();
		this.firstFormGroupQuestions = this._formBuilder.group({
			firstCtrl: [this.country, Validators.required]
		  });
		  this.getData()
	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}

	getData(){
		const controls = this.firstFormGroupQuestions.controls;
		this.country= controls['firstCtrl'].value[0].toUpperCase() + controls['firstCtrl'].value.slice(1) ,
		console.log(this.country);
		this.covidService.getCasesStatus(this.country).subscribe(res =>{
			this.casesData = res;
			console.log(this.casesData);
			this.cdr.markForCheck()
		})
		
	}
	
}
