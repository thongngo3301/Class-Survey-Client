import { Routes } from '@angular/router';

import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';
import { StudentManagerComponent } from '../../student-manager/student-manager.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'survey-manager', component: SurveyManagerComponent },
    { path: 'student-manager', component: StudentManagerComponent }
];
