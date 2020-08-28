export class PageConfig {
	public defaults: any = {
		'dashboard': {
			page: {
				'title': 'Test Yourself',
				'desc': 'Answer to the following questions.'
			},
		},
		'tips': {
			page: {
				'title': 'Tip & Precaution',
				'desc': 'Tip and precaution to prevent or protect from covid-19.'
			},
		},
		'helper': {
			page: {
				'title': 'Stage 3 patients',
				'desc': 'Please contact them and do the needful.'
			},
		},
		'test-result': {
			page: {
				'title': 'Test Results',
				'desc':'Your Privous Test Results'
			},
		},
		
		profile: {
			page: {title: 'User Profile', desc: ''}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
		wizard: {
			'wizard-1': {page: {title: 'Wizard 1', desc: ''}},
			'wizard-2': {page: {title: 'Wizard 2', desc: ''}},
			'wizard-3': {page: {title: 'Wizard 3', desc: ''}},
			'wizard-4': {page: {title: 'Wizard 4', desc: ''}},
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
