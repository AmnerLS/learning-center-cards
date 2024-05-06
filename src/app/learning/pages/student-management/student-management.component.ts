import {Component, OnInit} from '@angular/core';
import { Student } from "../../model/student.entity";
import { StudentCreateAndEditComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentsService} from "../../services/students.service";
import {MatIcon} from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgForOf, MatIcon, StudentCreateAndEditComponent, NgIf],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit {
  studentData: Student;
  isEditMode: boolean;
  dataStudents: any;

  constructor(private studentService: StudentsService, private dialog: MatDialog) {
    this.isEditMode = false;
    this.studentData = {} as Student;
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.studentData = {} as Student;
  }

  // CRUD Actions

  private getAllStudents() {
    this.studentService.getAll().subscribe((response: any) => {
      this.dataStudents = response;
      console.log(this.dataStudents);
    });
  };

  private createStudent() {
    this.studentService.create(this.studentData).subscribe((response: any) => {
      this.dataStudents.data.push({...response});
      this.dataStudents = this.dataStudents.map((student: Student) => { return student; });
    });
  };

  private updateStudent() {
    let studentToUpdate = this.studentData;
    this.studentService.update(this.studentData.id, studentToUpdate).subscribe((response: any) => {
      this.dataStudents = this.dataStudents.map((student: Student) => {
        if (student.id === response.id) {
          return response;
        }
        return student;
      });
    });
  };

  private deleteStudent(studentId: number) {
    this.studentService.delete(studentId).subscribe(() => {
      this.dataStudents = this.dataStudents.filter((student: Student) => {
        return student.id !== studentId ? student : false;
      });
    });
  };

  openDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentCreateAndEditComponent, {
      width: '400px',
      data: {
        student: student || null,
        isEditMode: this.isEditMode
      }
    });

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        if (this.isEditMode) {
          this.onStudentUpdated(result);
        } else {
          this.onStudentAdded(result);
        }
      } else {
        this.onCancelEdit();
      }
      this.getAllStudents();
    });
  }

  // UI Event Handlers
  showCreateForm() {
    this.openDialog();
  }
  onEditItem(element: Student) {
    this.isEditMode = true;
    this.studentData = element;
    this.openDialog(element);
  }

  onDeleteItem(element: Student) {
    this.deleteStudent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllStudents();
  }

  onStudentAdded(element: Student) {
    this.studentData = element;
    this.createStudent();
    this.resetEditState();
  }

  onStudentUpdated(element: Student) {
    this.studentData = element;
    this.updateStudent();
    this.resetEditState();
  }

  ngOnInit(): void {
    this.getAllStudents();
  }
}
