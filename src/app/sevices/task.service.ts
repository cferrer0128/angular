import {Injectable} from '@angular/core';

import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class TaskService{

    private domain:string='http://localhost:3000'
    constructor (private http:Http){
        console.log('Task service has been Initialized!!');
    }

    getTasks(){
        return this.http.get(this.domain+'/api/tasks')
        .map(res =>res.json())
    }


    addTask(newTask){
        var headers = new Headers();
        newTask.isdeleted = false;
        headers.append('Content-Type','application/json');
        return this.http.post(this.domain+'/api/task',JSON.stringify(newTask),{headers:headers})
        .map(res => res.json());
    }

    deleteTask(task){
       
        task.isdeleted = true;
        
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        
        return this.http.delete(this.domain+'/api/task/'+task._id,{headers:headers})
            .map(res => res.json());
    }

    updateTask(task){
        task.isdeleted = false;
        console.log('Task before deleting' + JSON.stringify(task));
        var headers = new Headers();
        headers.append('Content-Type','application/json');
          console.log('Task befor upding !!' + JSON.stringify(task));
          return this.http.put(this.domain+'/api/task/'+task._id,JSON.stringify(task),{headers:headers})
            .map(res => res.json());
    }
}