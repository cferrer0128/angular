import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../sevices/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks: any;
  title: string='';
  onetask:any;

  constructor(private taskservice:TaskService) {

    this.tasks=[];

    setInterval(()=>{

      this.taskservice.getTasks()
      .subscribe(mytask =>{
          this.tasks =[];
          let data = mytask.data;
          for(var i=0; i<data.length;i++){
            if(typeof data[i].isdone != "undefined" && typeof data[i].isdeleted != "undefined" && 
            !data[i].isdeleted) this.tasks.push(data[i]);
          }
      });

    },10000)

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
            console.log('before saving ' + task)
            this.tasks.push(task);
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
    .subscribe(mytask =>{

      console.log('data from Mongodb ', mytask)
      this.tasks =[];
      let data = mytask.data;
      for(var i=0; i<data.length;i++){
            if(typeof data[i].isdone != "undefined" && 
              typeof data[i].isdeleted != "undefined" && 
              !data[i].isdeleted)
               this.tasks.push(data[i]);

      }

      console.log('Tasks ',this.tasks)

    })
  }

}
