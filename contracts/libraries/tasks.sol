// Library for operations on tasks
//TODO: USe "self" for method-like calls. Use "storage" keyword for library calls
contract Validator{ //Abstract contract defining validator ABI
    function validate(uint taskID, bytes data) returns (bool val);
}

library Tasks {
    struct Task { //TODO: Define tasks
        address user;
        uint taskID;
        byte[] ipfsData; //note: ipfs uses arbitrary-length addresses
        uint startTime;
        uint duration;
        address validator;
        uint penalty; //penalty for not completing, denominated in whatever token the Goal uses
        uint reward;
        uint frequency; // 0 if single task, repeat period if > 0
        uint nextTask;  //linked list structure 
        uint prevTask;
    }

    struct taskList{  //TODO: fix all the things
        uint first;
        uint last;
        Tasks.Task[] tasks; //Sorted in order of due date
    }
    
    function validate(Task storage self, bytes validationData) returns (bool){
        if(block.timestamp > self.startTime && block.timestamp < self.startTime + self.duration){
            return  Validator(self.validator).validate(self.taskID, validationData);
        }
        return false;
    }
    
    function complete(taskList storage self, uint ID, bytes validationData) returns (uint reward){ //validate, re-add, and return reward amount
        uint penalty = clean(self);
        uint index = findID(self,ID);
        if(validate(self.tasks[index], validationData)){
            reward += self.tasks[index].reward;
            remove(self, index);
        }
    }

    
    function remove(taskList storage self, uint index){ //Remove task while maintaining sort order
        self.tasks[self.tasks[index].nextTask].prevTask = self.tasks[index].prevTask;
        self.tasks[self.tasks[index].prevTask].nextTask = self.tasks[index].nextTask;
        delete self.tasks[index];
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
    
    function add(taskList storage self, Task storage newTask){
        uint index; 
        for(uint j=0; j < self.tasks.length; j++){ //Insert task into array
            if(self.tasks[j].taskID == 0){
                self.tasks[j] = newTask;
                index = j;
            }
            else if(i==self.tasks.length-1){
                self.tasks.push(newTask);
            }
        }
        uint i = self.last;
        while(self.tasks[i].startTime+self.tasks[i].duration > newTask.startTime + newTask.duration){
            i=self.tasks[i].prevTask;
        }
        self.tasks[self.tasks[i].nextTask].prevTask = index;
        self.tasks[i].nextTask = index;
        
    }
    
    
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
    
    function clean(taskList storage self) returns (uint){
        uint penalty;
        uint i = self.first;
        while (self.tasks[i].startTime+self.tasks[i].duration< block.timestamp){
            penalty+=self.tasks[i].penalty;
            remove(self, i);
        }
        return penalty; 
    }
    
    function findID(taskList storage self, uint ID) returns (uint){
        for(uint i; i < self.tasks.length; i++){
            if(self.tasks[i].taskID == ID) return i;
        }
        throw;
    }
    

}