// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService) {
		this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		// get menu list
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
		var localUsers =  JSON.parse(localStorage.getItem("userDetails"))
		let result = this.getMenuTitle(localUsers,menuItems)

		this.menuList$.next(result);
	}

	getMenuTitle(localUsers,menuItems){
		if(localUsers.userRole ==='guest'){
			return menuItems.filter(m =>m.title !="Patients")
		}else{
			return menuItems.filter(m =>m.title =="Patients")
		}
	}
}
