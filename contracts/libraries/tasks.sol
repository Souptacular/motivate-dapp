// Library for operations on tasks

contract Validator{ //Abstract contract defining validator ABI
    function validate(uint taskID, bytes data) returns (bool val);
}

library Tasks {
    struct Task { //TODO: Define tasks
        address user;
        bytes validationData;
        uint taskID;
        byte[] ipfsData; //note: ipfs uses arbitrary-length addresses
        uint statTime;
        uint endTime;
        address validator;
        uint penalty; //penalty for not completing, denominated in whatever token the Goal uses
        uint reward;
    }

    function validate(Task task) returns (bool){
        if(block.timestamp > task.startTime && (block.timestamp < task.endTime){
            return  Validator(task.validator).validate(task.taskID, task.validationData);
        }
        return false;
    }
    
    function complete(){}





}