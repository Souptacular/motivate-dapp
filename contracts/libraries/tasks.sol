// Library for operations on tasks

contract Validator{ //Abstract contract defining validator ABI
    function validate(uint taskID, bytes data) returns (bool val);
}

library Tasks {
    struct Task { //TODO: Define tasks
        address user;
        uint taskID;
        byte[] ipfsData; //note: ipfs uses arbitrary-length addresses
        uint statTime;
        uint duration;
        address validator;
        uint penalty; //penalty for not completing, denominated in whatever token the Goal uses
        uint reward;
        uint frequency; // 0 if single task, repeat period if > 0
        uint nextTask;  //linked list structure 
        uint prevTask;
    }

    function validate(Task task, bytes validationData) returns (bool){
        if(block.timestamp > task.startTime && (block.timestamp < task.endTime){
            return  Validator(task.validator).validate(task.taskID, validationData);
        }
        return false;
    }
    
    function complete(Task task, bytes validationData) returns (uint reward){ //validate, re-add, and return reward amount
        if(validate(task, validationData)){
            
        }
    }

    
    function remove(Task[] tasks, uint index){ //Remove task while maintaining sort order
        Task task = tasks[index];
        tasks[task.nextTask].prevTask = task.prevTask;
        tasks[task.prevTask].nextTask = task.nextTask;
        delete tasks[index];
    }                                                                                   // TODO: Create linked list for tasks
    
    /*function add(Task[] tasks, Task newTask){                                         // OLD array based list structure
        tasks.length++;
        for(uint i=tasks.length-1, i > 0, i--;){
            if(tasks[i-1].endTime <= newTask.endTime){
                tasks[i] = newTask;
                break;
            }
            else{
                tasks[i] = tasks[i-1];
            }
            
        }
    }*/
    
    function add(Task[] tasks, Task newTask){
        uint index; 
        for(uint j=0, j < tasks.length, j++){ //Insert task into array
            if(tasks[j].taskID == 0){
                tasks[j] = newTask;
                index = j;
            }
            else if(i==tasks.length-1){
                tasks.push(newTask);
            }
        }
        uint i;
        while(tasks[i].startTime+tasks[i].duration > newTask.startTime + newTask.duration){
            i=tasks[i].prevTask;
        }
        tasks[tasks[i].nextTask].prevTask = index;
        tasks[i].nextTask = index;
        
    }
    
    function iterate(Task[] tasks){} // TODO: Implement general iteration
    
    
// TODO: Implement clean using new linked list
   /*  function clean(Task[] tasks) returns (uint penalty){
        uint penalty;
        for(uint i=0, i<tasks.length, i++){
            if(tasks[i].startTime < block.timestamp){
                penalty += tasks[i].penalty;
                remove(tasks,i);
            }
            else break;
        }
    }
    */ 
    
    
    

}