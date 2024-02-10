import { Injectable } from '@angular/core';
import { Course } from '../models';
import { Observable, delay, forkJoin, map, mergeMap, of } from 'rxjs';
import { Enrollment } from '../../enrollment/models';
import { EnrollmentService } from '../../enrollment/service/enrollment.service';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    courses: Course[] = [
        {
            id: 1,
            name: 'Curso de Angular avanzado',
            description: 'En este curso veras a fondo el framework de Angular',
            dateFrom: new Date(2024, 2, 1),
            dateTo: new Date(2024, 11, 30),
        },
        {
            id: 2,
            name: 'Curso de React',
            description: 'Aprende a construir aplicaciones web con React',
            dateFrom: new Date(2024, 5, 1),
            dateTo: new Date(2024, 8, 30),
        },
        {
            id: 3,
            name: 'Curso de Vue.js',
            description: 'Descubre el poder de Vue.js en el desarrollo web',
            dateFrom: new Date(2024, 9, 1),
            dateTo: new Date(2024, 11, 31),
        },
        {
            id: 4,
            name: 'Curso de Python',
            description: 'Aprende a programar en Python desde cero',
            dateFrom: new Date(2024, 3, 1),
            dateTo: new Date(2024, 6, 30),
        }
    ];

    constructor(private enrollmentService: EnrollmentService) { }

    getCourses(): Observable<Course[]> {
        return of(this.courses).pipe(delay(1000));
    }

    getCoursesByStudentId(studentId: number): Observable<Course[]> {
        return this.enrollmentService.getEnrollmentsByStudentId(studentId).pipe(
            mergeMap((enrollments: Enrollment[]) => {
                const courseIds = enrollments.map((enrollment) => enrollment.courseId);
                return this.getCoursesByIds(courseIds);
            })
        );
    }

    getCoursesByIds(courseIds: number[]): Observable<Course[]> {
        return of(this.courses.filter(course => courseIds.includes(course.id))).pipe(delay(1000));
    }

    addCourse(course: Course): Observable<Course[]> {
        course.id = this.getUniqueId();
        this.courses = [...this.courses, course];

        return this.getCourses();
    }

    private getUniqueId(): number {
        const maxId = Math.max(...this.courses.map(c => c.id));
        return maxId + 1;
    }

    editCourse(course: Course): Observable<Course[]> {
        this.courses = this.courses.filter(c => c.id !== course.id);
        this.courses = [...this.courses, course];
        this.courses.sort((a, b) => a.id - b.id);

        return this.getCourses();
    }

    deleteCourse(courseId: number): Observable<Course[]> {
        this.courses = this.courses.filter((c) => c.id !== courseId);
        return this.getCourses();
    }
}
