import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { StudentManagerComponent } from '../../student-manager/student-manager.component';
import { StudentProfileComponent } from '../../components/student-profile/student-profile.component';
import { LecturerManagerComponent } from '../../lecturer-manager/lecturer-manager.component';
import { LecturerProfileComponent } from '../../components/lecturer-profile/lecturer-profile.component';
import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';
import { SurveyComponent } from '../../components/survey/survey.component';
import { TemplateManagerComponent } from '../../template-manager/template-manager.component';
import { TemplateEditorComponent } from '../../components/template-editor/template-editor.component';
import { SurveySheetComponent } from '../../components/survey-sheet/survey-sheet.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'import-excel/:type', component: FileUploaderComponent },
    { path: 'student-manager', component: StudentManagerComponent },
    { path: 'student-manager/:action', component: StudentProfileComponent },
    { path: 'student-manager/:action/:id', component: StudentProfileComponent },
    { path: 'lecturer-manager', component: LecturerManagerComponent },
    { path: 'lecturer-manager/:action', component: LecturerProfileComponent },
    { path: 'lecturer-manager/:action/:id', component: LecturerProfileComponent },
    { path: 'survey-manager', component: SurveyManagerComponent },
    { path: 'survey-manager/:action', component: SurveyComponent },
    { path: 'survey-manager/:action/:id', component: SurveyComponent },
    { path: 'template-manager', component: TemplateManagerComponent },
    { path: 'template-manager/:action', component: TemplateEditorComponent },
    { path: 'template-manager/:action/:id', component: TemplateEditorComponent },
    { path: 'survey-sheet/:action/:id', component: SurveySheetComponent }
];
