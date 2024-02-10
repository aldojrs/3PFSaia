import { Injectable } from '@angular/core';
import { Enrollment } from '../models';
import { Observable, delay, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    enrollments: Enrollment[] = [
        {
            id: 1,
            studentId: 1,
            courseId: 1,
            date: new Date().setFullYear(2023, 5, 12),
        },
        {
            id: 2,
            studentId: 1,
            courseId: 2,
            date: new Date().setFullYear(2023, 0, 10),
        },
        {
            id: 3,
            studentId: 2,
            courseId: 3,
            date: new Date().setFullYear(2023, 2, 25),
        },
        {
            id: 4,
            studentId: 2,
            courseId: 4,
            date: new Date().setFullYear(2023, 8, 8),
        },
        {
            id: 5,
            studentId: 3,
            courseId: 1,
            date: new Date().setFullYear(2023, 4, 30),
        },
        {
            id: 6,
            studentId: 3,
            courseId: 3,
            date: new Date().setFullYear(2023, 6, 24),
        },
    ];

    getEnrollmentsByStudentId(studentId: number): Observable<Enrollment[]> {
        return of(this.enrollments.filter(e => e.studentId === studentId)).pipe(delay(1000));
    }

    getEnrollmentsByCourseId(courseId: number): Observable<Enrollment[]> {
        return of(this.enrollments.filter(e => e.courseId === courseId)).pipe(delay(1000));
    }

    unenroll(studentId: number, courseId: number): void {
        this.enrollments = this.enrollments.filter(e => !(e.studentId === studentId && e.courseId === courseId));
    }    

}
