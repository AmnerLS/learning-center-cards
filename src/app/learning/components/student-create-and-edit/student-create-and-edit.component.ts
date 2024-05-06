import {Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {Student} from "../../model/student.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './student-create-and-edit.component.html',
  styleUrl: './student-create-and-edit.component.css'
})
export class StudentCreateAndEditComponent {
  // Attributes
  student: Student;
  editMode: boolean;
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  constructor(private dialogReference: MatDialogRef<StudentCreateAndEditComponent>,@Inject(MAT_DIALOG_DATA) public data: { student: Student, isEditMode: boolean }) {
    this.student = { ...(data.student || {}) };
    this.editMode = data.isEditMode;
  }

  // Event Handlers

  onSubmit() {
    if (this.studentForm.form.valid) {
      this.dialogReference.close(this.student);
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.dialogReference.close(null);
  }
}
