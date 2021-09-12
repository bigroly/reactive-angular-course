import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) _course:Course,
        private _coursesService: CoursesService) {

        this.course = _course;

        this.form = _fb.group({
            description: [_course.description, Validators.required],
            category: [_course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [_course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
        const changes = this.form.value;
        this._coursesService.saveCourse(this.course.id, changes)
            .subscribe(
                val => {
                    this._dialogRef.close(val);
                }
            );
    }

    close() {
        this._dialogRef.close();
    }

}
