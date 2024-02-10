import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../features/student/student.component';

const routes: Routes = [
    { path: 'home', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule) },
    { path: 'student', loadChildren: () => import('../features/student/student.module').then(m => m.StudentModule) },
    { path: 'course', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule) },
    { path: '**', redirectTo: 'home' },
    // { path: 'enrollment', loadChildren: () => import('../features/enrollment/enrollment.module').then(m => m.EnrollmentModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }