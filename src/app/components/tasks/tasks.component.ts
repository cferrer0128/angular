import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../sevices/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any;
  title: string='';
  onetask:any;

  constructor(private taskservice:TaskService) {

    this.tasks=[];

   }

 //update Task
 updateTask(task){
  // console.log('before updating ' + task)
  var _task = {
      Title:task.Title,
      _id:task._id,
      isdone:!task.isdone
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
    //calling the service....
    this.taskservice.addTask(newTask)
        .subscribe(task =>{
            console.log('before saving ' + task)
            this.tasks.push(task);
        })

  }
  //delete task...
  deleteTask(task){
    task.isdeleted = true;
    this.onetask = task;
        this.taskservice.deleteTask(task)
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
    .subscribe(mytask =>{

      this.tasks =[];
      for(var i=0; i<mytask.length;i++){
            if(typeof mytask[i].isdone != "undefined"){
              console.log('Task ',mytask[i])
              this.tasks.push(mytask[i]);
            }
              

      }

    })
  }

}
