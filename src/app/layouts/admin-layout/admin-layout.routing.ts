import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { StudentManagerComponent } from '../../student-manager/student-manager.component';
import { NewStudentComponent } from '../../student-manager/new-student/new-student.component';
import { EditStudentComponent } from '../../student-manager/edit-student/edit-student.component';
import { LecturerManagerComponent } from '../../lecturer-manager/lecturer-manager.component';
import { SurveyManagerComponent } from '../../survey-manager/survey-manager.component';
import { EditSurveyComponent } from '../../survey-manager/edit-survey/edit-survey.component';
import { TemplateManagerComponent } from '../../template-manager/template-manager.component';
import { TemplateEditorComponent } from '../../components/template-editor/template-editor.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: DashboardComponent },
    { path: 'admin/user-profile', component: UserProfileComponent },
    { path: 'admin/typography', component: TypographyComponent },
    // { path: 'admin/icons', component: IconsComponent },
    { path: 'admin/import-excel/:type', component: FileUploaderComponent },
    { path: 'admin/student-manager', component: StudentManagerComponent },
    { path: 'admin/student-manager/new', component: NewStudentComponent },
    { path: 'admin/student-manager/edit/:id', component: EditStudentComponent },
    { path: 'admin/lecturer-manager', component: LecturerManagerComponent },
    { path: 'admin/survey-manager', component: SurveyManagerComponent },
    { path: 'admin/survey-manager/edit/:id', component: EditSurveyComponent },
    { path: 'admin/template-manager', component: TemplateManagerComponent },
    { path: 'admin/template-manager/:action', component: TemplateEditorComponent },
    { path: 'admin/template-manager/:action/:id', component: TemplateEditorComponent }
];
