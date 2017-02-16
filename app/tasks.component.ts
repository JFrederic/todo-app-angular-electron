import { Component } from '@angular/core';
import Datastore = require('nedb');
import { Http,Headers } from '@angular/http'


@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'todos.component.html',
})

export class TasksComponent {
     public newTask: string;
     public task: any;
     public db:any;
     public tasks: any[];
     
     
     constructor() {
         this.newTask = '';
         this.db = new Datastore({ filename: 'db/tasks.json', autoload: true });
         this.getAll();
         this.updateTask
     }
     

     public createTask() {
        this.task = {
          newTask: this.newTask,
          completed: false
         }
        this.db.insert(this.task, (err: Error)=>{
            if(err) throw Error
            this.getAll();
        });
        
         
     }

     public getAll(){
         this.db.find({},(err:Error, data:any[]) =>{           
             if(err) throw err;
             this.tasks =  data
         })  
     }  

    public updateTask(task:any){
        task.completed? task.completed = false : task.completed = true  
        this.db.update({ _id : task._id }, { $set : { complete: task.completed }})
        console.log(task.completed)
    } 
    
    public deleteTask(task:any){
        console.log(task)
        this.db.remove({_id : task._id});
        this.getAll();
    }

    public deleteCheckedTask(tasks:any[]){
        for(let task of tasks){
            if(task.completed){
                this.db.remove({},{multi:true});
        }
    }    
    console.log(tasks)
}

    public deleteAllTask(tasks:any[]){
            this.db.remove({},{multi:true})
            this.getAll();
    }

}


export class QueryService {
  static get parameters() {                                                                                                                    
    return [[Http]]                                                                                                            
  }  

  todo:any = new TasksComponent()

  constructor(public http: Http) {                                                                                                            
    this.http = http;                                                                                                                          
  }

  onFormSubmit(){
    var headers = new Headers();
    headers.append('Content-Type','application/json')
     return this.http.post('http://localhost:3000/addtask', JSON.stringify(this.todo.getAll()), { headers: headers });
  }                                                                                                                                       


