import {Injectable} from '@angular/core';

import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class TaskService{


    private domain:string='https://u9avc8h706.execute-api.us-east-2.amazonaws.com/dev'//'https://myionic.azurewebsites.net/'

    constructor (private http:Http){
        console.log('Task service has been Initialized!!');
    }

    public getTasks(){
        return this.http.get(this.domain)
        .map(res =>res.json())
        .toPromise();
    }

///api/task
    addTask(newTask){
        var headers = new Headers();
        //newTask.isdeleted = false;
        headers.append('Content-Type','application/json');
        return this.http.post(this.domain+'',JSON.stringify(newTask),{headers:headers})
        .map(res => res.json());
        }

    
    deleteTask(task){
       
        task.isdeleted = true;
        
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        
            /*return this.http.delete(this.domain+''+task._id,{headers:headers})
            .map(res => res.json());*/
            
            return this.http.put(this.domain+'',JSON.stringify(task),{headers:headers})
            .map(res => res.json());
    }

    updateTask(task){
        
        var headers = new Headers();
        headers.append('Content-Type','application/json');
          console.log('Task befor upding !!' + JSON.stringify(task));
          return this.http.put(this.domain+'',JSON.stringify(task),{headers:headers})
            .map(res => res.json());
    }
}