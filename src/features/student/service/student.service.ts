import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, delay, mergeMap, of, throwError } from 'rxjs';
import { EnrollmentService } from '../../enrollment/service/enrollment.service';
import { Enrollment } from '../../enrollment/models';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    students: Student[] = [
        {
            id: 1,
            firstName: 'Juan',
            lastName: 'Perez',
            documentNro: 12345678,
            email: 'jp@mail.com',
            registrationDate: new Date(2023, 5, 12),
        },
        {
            id: 2,
            firstName: 'José',
            lastName: 'Gomez',
            documentNro: 87344321,
            email: 'jg@mail.com',
            registrationDate: new Date(2023, 0, 10),
        },
        {
            id: 3,
            firstName: 'Maria',
            lastName: 'Gonzalez',
            documentNro: 12345658,
            email: 'mg@mail.com',
            registrationDate: new Date(2023, 2, 25),
        },
        {
            id: 4,
            firstName: 'Lucia',
            lastName: 'Moreno',
            documentNro: 87654321,
            email: 'lm@mail.com',
            registrationDate: new Date(2023, 8, 8),
        },
        {
            id: 5,
            firstName: 'Diego',
            lastName: 'Maradona',
            documentNro: 12392678,
            email: 'diego@mail.com',
            registrationDate: new Date(2023, 4, 30),
        },
        {
            id: 6,
            firstName: 'Lionel',
            lastName: 'Messi',
            documentNro: 87659521,
            email: 'lionel@mail.com',
            registrationDate: new Date(2023, 6, 24),
        },
    ];

    constructor(private enrollmentService: EnrollmentService) { }

    getStudents(): Observable<Student[]> {
        return of(this.students).pipe(delay(1000));
    }

    getStudentByIds(studentIds: number[]): Observable<Student[]> {
        return of(this.students.filter(s => studentIds.includes(s.id))).pipe(delay(1000));
    }

    getStudentsByCourseId(courseId: number): Observable<Student[]> {
        return this.enrollmentService.getEnrollmentsByCourseId(courseId).pipe(
            mergeMap((enrollments: Enrollment[]) => {
                const studentIds = enrollments.map((enrollment) => enrollment.studentId);
                return this.getStudentByIds(studentIds);
            })
        );
    }

    addStudent(student: Student): Observable<Student[]> {
        const existingStudent = this.students.find(s => s.documentNro === student.documentNro);
        if (existingStudent) {
            const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
            return throwError(() => err);
        }

        student.id = this.getUniqueId();
        student.registrationDate = new Date();
        this.students = [...this.students, student];

        return this.getStudents();
    }

    private getUniqueId(): number {
        const maxId = Math.max(...this.students.map(s => s.id));
        return maxId + 1;
    }

    editStudent(student: Student): Observable<Student[]> {
        const existingStudent = this.students.find(s => s.documentNro === student.documentNro);
        if (existingStudent && existingStudent.id !== student.id) {
            const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
            return throwError(() => err);
        }

        this.students = this.students.filter(s => s.id !== student.id);
        this.students = [...this.students, student];
        this.students.sort((a, b) => a.id - b.id);

        return this.getStudents();
    }

    deleteStudent(studentId: number): Observable<Student[]> {
        this.students = this.students.filter(s => s.id !== studentId);
        return this.getStudents();
    }

}
