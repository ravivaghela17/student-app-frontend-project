import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http:HttpClient) { }

  saveStudent(student:any){
    const newheaders = { 'content-type': 'application/json'};
    return this.http.post("http://localhost:3000/insert",{"student":student},{
      headers:newheaders
    })
  }
  getStudent(){
    return this.http.get("http://localhost:3000/");
  }
}
