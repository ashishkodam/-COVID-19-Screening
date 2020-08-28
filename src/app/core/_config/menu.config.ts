export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Covid-19 Screening',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					
				},
				{
					title: 'Test results',
					root: true,
					alignment: 'left',
					toggle: 'click',
					page:'/test-result'
				},
				{
					title: 'Tips',
					root: true,
					alignment: 'left',
					toggle: 'click',
					page:'/tips'
				},			
				
				{
					title: 'Patients',
					root: true,
					alignment: 'left',
					toggle: 'click',
					page:'/helper'
				},					
				
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Covid-19 Screening',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					bullet: 'dot',
				},
				
				{
					title: 'Tips',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-digital-marketing',
					page:'/tips'
				},
				{
					title: 'Test results',
					root: true,
					alignment: 'left',
					toggle: 'click',
					page:'/test-result'
				},	
				
				
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
