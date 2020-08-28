// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'tips',
				loadChildren: () => import('./views/pages/tips/tips.module').then(m => m.TipsModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'test-result',
				loadChildren: () => import('./views/pages/role/role.module').then(m => m.roleModule)
			},
			{
				path: 'helper',
				loadChildren: () => import('./views/pages/helper/helper.module').then(m => m.helperModule)
			},
			// {
			// 	path: 'error/403',
			// 	component: ErrorPageComponent,
			// 	data: {
			// 		'type': 'error-v6',
			// 		'code': 403,
			// 		'title': '403... Access forbidden',
			// 		'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
			// 	}
			// },
			// {path: 'error/:type', component: ErrorPageComponent},
			// {path: '', redirectTo: 'projects', pathMatch: 'full'},
			// {path: '**', redirectTo: 'projects', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
