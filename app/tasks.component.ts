import { Component } from '@angular/core';
import Datastore = require('nedb');

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
             console.log(this.tasks)
            
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
        this.db.update({ task }, { $set : { complete: task.completed }})
    } 
    
    public deleteTask(task:any){
        console.log(task)
        this.db.remove({_id : task._id});
        this.getAll();
    }

    public deleteCheckedTask(task:any){
        if(task.completed){
            console.log(task.completed)
            this.db.remove(task);
        }

            this.getAll();
        
    }

    public deleteAllTask(tasks:any[]){
            this.db.remove({},{multi:true})
            this.getAll();
    }

    
    get diagnostic() { return JSON.stringify(this.task);}
}
