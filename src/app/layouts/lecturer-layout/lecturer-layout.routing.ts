import { Routes } from '@angular/router';

import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';
import { LecturerManagerComponent } from '../../lecturer-manager/lecturer-manager.component';

export const LecturerLayoutRoutes: Routes = [
    { path: 'survey-manager', component: SurveyManagerComponent },
    { path: 'lecturer-manager', component: LecturerManagerComponent }
];
