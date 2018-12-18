import { Routes } from '@angular/router';

import { IconsComponent } from '../../icons/icons.component';
import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'survey-manager', component: SurveyManagerComponent },
    { path: 'icons', component: IconsComponent }
];
