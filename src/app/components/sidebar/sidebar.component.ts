import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

const adminRoutes = [
    { path: '/home', title: 'Home', icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
    { path: '/survey-manager', title: 'Survey Manager', icon: 'education_paper', class: '' },
    { path: '/template-manager', title: 'Template Manager', icon: 'design_bullet-list-67', class: '' },
    { path: '/student-manager', title: 'Student Manager', icon: 'business_badge', class: '' },
    { path: '/lecturer-manager', title: 'Lecturer Manager', icon: 'business_briefcase-24', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
    { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' }
]

const studentRoutes = [
    { path: '/home', title: 'Home', icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: '' },
]

const lecturerRoutes = [
    { path: '/home', title: 'Home', icon: 'design_app', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' }
]

let _routes;

let userType = 'ADMIN';

switch (userType) {
    case 'ADMIN':
        _routes = adminRoutes;
        break;
    case 'STUDENT':
        _routes = studentRoutes;
        break;
    case 'LECTURER':
        _routes = lecturerRoutes;
        break;
}

export const ROUTES: RouteInfo[] = _routes;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
