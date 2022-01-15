import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { StudentServiceService } from './student-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'studentApp';
  studentForm:FormGroup;
  students:any[];
  displayedColumns = ['name', 'dateOfBirth', 'semester', 'courses', 'notes'];
  constructor(private fb: FormBuilder,private studentservice:StudentServiceService,private _snackbar:MatSnackBar) {}

  ngOnInit(){
    this.studentForm = this.fb.group({
      firstName: new FormControl('',Validators.required),
      semester:new FormControl('',Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      courses:this.fb.array([]),
      notes:new FormControl('')
    });
    this.getStundets();
    
  }
  getStundets(){
    this.studentservice.getStudent().subscribe((res:any)=>{
      if(res){
        this.students=res.students;
      }
    })
  }
  onCheckboxChange(event){
    console.log(event);
    const courseControl :FormArray = this.studentForm.get('courses') as FormArray;
   if(event.checked){
    courseControl.push(new FormControl(event.source.value));
   }
   else
   {
     let i = courseControl.controls.findIndex(x=> x.value == event.source.value);
     courseControl.removeAt(i);
   }
  
  }

  saveStudent(){
   if(this.studentForm.valid){
     let course ="";
     const courseControlValue = this.studentForm.get("courses")?.value;
     for(let i=0;i<courseControlValue.length;i++){
        course= course+ " , " + courseControlValue[i]
     }
     
    var student={
      "name":this.studentForm.get('firstName')?.value,
      "dateOfBirth":this.studentForm.get("dateOfBirth")?.value,
      "semester":this.studentForm.get("semester")?.value,
      "courses":course,
      "notes":this.studentForm.get("notes")?.value
    }
    console.log(student);

    this.studentservice.saveStudent(student).subscribe((res:any)=>{
      if(res?.success){
        this.getStundets();
        this._snackbar.open(res.message,'success');
      }
    })
   }
  }
}
