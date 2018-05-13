import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../sevices/task.service';
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from "rxjs/Rx";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks=[];

  public config = {
    title: "Serverless Table",
    w: 300,
    h: 300,
    itemHeight: 31,
    totalRows: this.tasks.length>0?this.tasks.length:0,
    items: this.tasks,
    sort:{'_id':'desc'}
  }

  
  title: string='';
  onetask:any;
  public myTimer:any;
  public isloaded:boolean=false;

  public arrRecords: Promise<any>|null = null;

   onRowClick(row:any){
    console.log(row);
    console.log("selected row:"+ row._id +" "+row.Title);
    //console.log(row);
  }

  constructor(private taskservice:TaskService) {

    this.tasks=[];

   //Interval here...

      let start = Date.now();
      /*
      setInterval(() => {

        this.myTimer = new Date(Date.now() - start).toTimeString();

      
          console.log("seconds elapsed = " + Math.floor((Date.now() - start)/1000));
        // expected output : seconds elapsed = 2
      }, 1000);*/
      
   }

 //update Task
 updateTask(task){
  // console.log('before updating ' + task)
  var _task = {
      Title:task.Title,
      _id:task._id,
      isdone:!task.isdone,
      isdeleted:false
  };
  this.taskservice.updateTask(_task)
  .subscribe(data =>{
      task.isdone = !task.isdone;
  })
}
//add
  addTask(event){
    event.preventDefault();
    var newTask = {
        Title: this.title,
        isdone:false
    }
    this.title = "";
    //calling the service....
    this.taskservice.addTask(newTask)
        .subscribe(task =>{
            console.log('saved ', task)
            this.tasks.push(task.packageSent);
            this.arrRecords = new Promise<any>((resolve,reject) => { resolve(this.tasks)})

        })

  }
  //delete task...
  deleteTask(task){
   
    var _task = {
      Title:task.Title,
      _id:task._id,
      isdone:task.isdone,
      isdeleted:true
    };
    this.onetask = task;
        this.taskservice.updateTask(_task)
        .subscribe(data =>{
          //console.log('Delete task... ' + JSON.stringify(data));
          for(var i=0; i<this.tasks.length;i++){
                if(this.tasks[i]._id == this.onetask._id){
                    
                      console.log('Delete task... ' + JSON.stringify(this.tasks[i]))
                      this.tasks.splice(i,1);
                }
                   
          }
            
                
        })

}

  ngOnInit() {
    this.taskservice.getTasks()
    .then(mytask =>{

      console.log('data from Mongodb ', mytask)
      let myTime = Date.now();
      this.isloaded =  true;
      this.tasks =[];
      let data = mytask.data;
      for(var i=0; i<data.length;i++){
            if(typeof data[i].isdone != "undefined" && 
              typeof data[i].isdeleted != "undefined" && 
              !data[i].isdeleted)
               this.tasks.push(data[i]);

               console.log('FOR LOOP ngOnInit Seconds ', Math.floor((Date.now() - myTime)/1000))
      }

      this.arrRecords = new Promise<any>((resolve,reject) => { resolve(this.tasks)})


      //this.config.items = this.tasks;
      console.log('end time FOR LOOP ngOnInit ', Math.floor((Date.now() - myTime)/1000))
      

    }).catch(err =>{ console.log('Error get task Promise  ')})
  }

}
