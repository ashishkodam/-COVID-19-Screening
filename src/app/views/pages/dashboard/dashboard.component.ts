// Angular
import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	ElementRef,
} from "@angular/core";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
	CdkDrag,
} from "@angular/cdk/drag-drop";
// Lodash
import { shuffle } from "lodash";
// Services
// Widgets model
import {
	LayoutConfigService,
	SparklineChartOptions,
} from "../../../core/_base/layout";
import { Widget4Data } from "../../partials/content/widgets/widget4/widget4.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { google } from '@agm/core/services/google-maps-types';
import {} from 'googlemaps';
import { CovidService } from "../../pages";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	@ViewChild("map", { static: false }) mapElement: ElementRef;
	map: google.maps.Map;
	infoWindow = new google.maps.InfoWindow();

	firstFormGroupQuestions: FormGroup;
	secondFormGroupQuestions: FormGroup;
	thirdFormGroupQuestions: FormGroup;
	hasFormErrors: boolean = false;
	public latitude = 32.326595;
	public longitude = -106.775436;
	resultPlace = [];
	userDetails: any;
	covidStage: any;
	covidePoints:number;
	constructor(
		private _formBuilder: FormBuilder,
		private service: CovidService
	) {
		var location;
		if (navigator) {
			navigator.geolocation.watchPosition(
				(pos) => {
					//this.showTrackingPosition(pos);

					this.latitude = pos.coords.latitude,
						this.longitude = pos.coords.longitude,
						this.infoWindow.setPosition(location);
					this.infoWindow.setContent("Location found.");
					this.infoWindow.open(this.map);
					this.map.setCenter(location);
				},
				function () {
					this.handleLocationError(
						true,
						this.infoWindow,
						this.map.getCenter()
					);
				}
			);
		} else {
			// Browser doesn't support Geolocation
			this.handleLocationError(
				false,
				this.infoWindow,
				this.map.getCenter()
			);
		}
	}

	ngOnInit() {
		var userDetails = JSON.parse(localStorage.getItem("userDetails"));
		this.createForm();
		//console.log(this.userDetails)
		 this.getUserById(userDetails.googleId)
	}

	getUserById(userDetailsId){
		this.service.getUserById(userDetailsId).subscribe((res) =>{
			this.userDetails =res;
			console.log('userDetails',res)
		})
	}

	createForm() {
		this.firstFormGroupQuestions = this._formBuilder.group({
			pain: ["", Validators.required],
			breath: ["", Validators.required],
			lighthead: ["", Validators.required],
			unresponsiveness: ["", Validators.required],
			sweating: ["", Validators.required],
			cough: ["", Validators.required],
		});
		this.secondFormGroupQuestions = this._formBuilder.group({
			travelling: ["", Validators.required],
			covid_area: ["", Validators.required],
			covid_person: ["", Validators.required],
			healthcare_center: ["", Validators.required],
			vomit: ["", Validators.required],
		});

		this.thirdFormGroupQuestions = this._formBuilder.group({
			specialCase: ["", Validators.required],
			age: ["", Validators.required],
			disclose: ["", Validators.required],
		});
	}

	secoundquestion() {
		this.hasFormErrors = false;
		const controls = this.firstFormGroupQuestions.controls;
		/** check form */
		if (this.firstFormGroupQuestions.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;

			return;
		}
	}

	thirdQuestion() {
		this.hasFormErrors = false;
		const controls = this.secondFormGroupQuestions.controls;
		/** check form */
		if (this.secondFormGroupQuestions.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;

			return;
		}
	}

	prepareAnswers() {
		const controlsf = this.firstFormGroupQuestions.controls;
		const controlss = this.secondFormGroupQuestions.controls;
		const controlst = this.thirdFormGroupQuestions.controls;

		const firstQuestinDetails = {
			pain: controlsf["pain"].value,
			breath: controlsf["breath"].value,
			lighthead: controlsf["lighthead"].value,
			unresponsiveness: controlsf["unresponsiveness"].value,
			sweating: controlsf["sweating"].value,
			cough: controlsf["cough"].value,
		};
		const secoundQuestinDetails = {
			travelling: controlss["travelling"].value,
			covid_area: controlss["covid_area"].value,
			covid_person: controlss["covid_person"].value,
			healthcare_center: controlss["healthcare_center"].value,
			vomit: controlss["vomit"].value,
		};

		const thirdQuestinDetails = {
			specialCase: controlst["specialCase"].value,
			age: controlst["age"].value,
			disclose: controlst["disclose"].value,
		};
		const userAnswers = {
			firstQuestinDetails,
			secoundQuestinDetails,
			thirdQuestinDetails,
		};
		return userAnswers;
	}

	submit(stepper, lgModal) {
		var count = 0;
		let stage: string;
		let points: number;
		let testResult: string;
		// tslint:disable-next-line:prefer-const
		let userAnswers = this.prepareAnswers();
		let userData = [];
		let userRole :string;
		userData.push(
			userAnswers.firstQuestinDetails,
			userAnswers.secoundQuestinDetails,
			userAnswers.thirdQuestinDetails
		);
		let age = userAnswers.thirdQuestinDetails.age;
		let disclose = userAnswers.thirdQuestinDetails.disclose;
		let disease = userAnswers.thirdQuestinDetails.specialCase;
		Object.keys(userData).forEach(function (key) {
			Object.keys(userData[key]).forEach(function (key2) {
				// console.log(
				// 	key +
				// 		"\t : main key \t" +
				// 		key2 +
				// 		"\t :second key \t" +
				// 		userData[key][key2]
				// );

				if (userData[key][key2] === "yes") {
					count++;
				}

				// if (
				// 	userData[key][key2] === "1" ||
				// 	userData[key][key2] === "4"
				// ) {
				// 	count = count + 5;
				// }

				// console.log(count);
			});
		});
		console.log('disease',disease)
		if (count !== 0 && (age === "1" || age === "4")) {
			count = count + 5;
		}
		if (count !== 0 && disease != "none") {
			count = count + 5;
		}
		if (disclose === "yes") {
			count = count - 1;
		}
		if (count > 7) {
			stage = '3';
			points = count;
			testResult = "positive";
			userRole = "patient"
		} else if (count > 3) {
			stage = '2';
			points = count;
			testResult = "positive";
			userRole = "patient"
		} else if (count > 0) {
			stage = '1';
			points = count;
			testResult = "positive";
			userRole = "patient"
		} else {
			stage = '0';
			points = 0;
			testResult = "negative";
			userRole = "guest"
		}
		//console.log(stage,points)
		this.updateUser(stage, points, testResult,userRole, stepper, lgModal);
	}

	updateUser(stage, points, testResult, userRole,stepper, lgModal) {
		let testArray :any
		var testpoints:string 
		testpoints = String(points),
		testArray =	{
				"testResult": testResult,
				"testDate": new Date(),
				"stage": stage,
				"score": testpoints,
			};
		
		console.log("stage", stage, "points", testpoints,userRole);
		Object.assign(testArray);
		let location ={
			"lat":this.latitude,
			"long":this.longitude
		};
		console.log('Before',this.userDetails.covidTest)
		this.userDetails.covidTest.push(testArray);
		console.log('After',this.userDetails.covidTest)
		this.userDetails.score = testpoints;
		this.userDetails.userRole = userRole;
		this.userDetails.location =location
		//console.log(this.userDetails)
		this.service.updateUserTest(this.userDetails).subscribe(res =>{
			this.covidStage = stage;
		 	this.covidePoints = points;
			console.log(res)
			localStorage.setItem('userDetails',JSON.stringify(res))
			lgModal.show();
			this.reset();
			stepper.reset()
		 })
		// this.covidStage = stage;
		// 	this.covidePoints = points;
		// 	// console.log(res)
		// 	lgModal.show();
		// 	this.reset();
		// 	stepper.reset()
	}
	/**
	 * Reset
	 */
	reset() {
		this.createForm();
		this.hasFormErrors = false;
		this.firstFormGroupQuestions.markAsPristine();
		this.firstFormGroupQuestions.markAsUntouched();
		this.firstFormGroupQuestions.updateValueAndValidity();

		this.secondFormGroupQuestions.markAsPristine();
		this.secondFormGroupQuestions.markAsUntouched();
		this.secondFormGroupQuestions.updateValueAndValidity();

		this.thirdFormGroupQuestions.markAsPristine();
		this.thirdFormGroupQuestions.markAsUntouched();
		this.thirdFormGroupQuestions.updateValueAndValidity();
	}

	/**
	 * Close alert
	 *
	 * @param $event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
			browserHasGeolocation
				? "Error: The Geolocation service failed."
				: "Error: Your browser doesn't support geolocation."
		);
		infoWindow.open(this.map);
	}

	//   onClickEnvent(event){
	//     console.log(event)
	//     this.latitude = event.coords.lat;
	//     this.longitude =  event.coords.lng
	//   }

	//   showTrackingPosition(position) {
	//     var placeArray =[]
	//     var location = {lat:this.latitude,lng:this.longitude}
	//     let mapProperties = {
	//       center: location,
	//       zoom: 12,
	//       mapTypeId: google.maps.MapTypeId.ROADMAP
	//  };
	//     this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
	//     let marker = new google.maps.Marker({
	//       position:location,map:this.map})
	//var service = new google.maps.places.PlacesService(google.maps.Map)
	// var service = new google.maps.places.PlacesService(this.map);
	// service.nearbySearch({
	//   location: location,
	//    radius: 500,
	//    type: ["health","hospital"]
	//   },
	//   function(results, status) {
	//     if (status == 'OK') {
	//       placeArray = results
	//       console.log(placeArray);
	//       this.resultPlace = placeArray
	//       var bounds = new google.maps.LatLngBounds();
	//       placeArray.slice(0,10).map(m => {
	//         var image = {
	//           url: m.icon,
	//           size: new google.maps.Size(71, 71),
	//           origin: new google.maps.Point(0, 0),
	//           anchor: new google.maps.Point(17, 34),
	//           scaledSize: new google.maps.Size(25, 25)
	//         };
	//         var marker = new google.maps.Marker({
	//           map: this.map,
	//           icon: image,
	//           title: m.name,
	//           position: m.geometry.location
	//         });
	//         google.maps.event.addListener(marker, 'click', function() {
	//           this.infowindow.setContent(m.name);
	//          this.infowindow.open(this.map, this);
	//         });
	//         bounds.extend(m.geometry.location);
	//       });
	//     };

	//   })
	//};
}
