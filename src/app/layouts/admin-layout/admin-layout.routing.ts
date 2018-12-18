import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
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
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'import-excel/:type', component: FileUploaderComponent },
    { path: 'student-manager', component: StudentManagerComponent },
    { path: 'student-manager/new', component: NewStudentComponent },
    { path: 'student-manager/edit/:id', component: EditStudentComponent },
    { path: 'lecturer-manager', component: LecturerManagerComponent },
    { path: 'survey-manager', component: SurveyManagerComponent },
    { path: 'survey-manager/edit/:id', component: EditSurveyComponent },
    { path: 'template-manager', component: TemplateManagerComponent },
    { path: 'template-manager/:action', component: TemplateEditorComponent },
    { path: 'template-manager/:action/:id', component: TemplateEditorComponent }
];
