import "libraries/tasks.sol"
contract Goal{
    address public user;
    bytes public ipfs; //ipfs hash
    Tasks.Task[] public current_tasks; //Sorted in order of due date
    //TODO: Implement repeated tasks efficiently. Idea: Implement repeated tsks as single tasks that re-add themselves (low storage, but high computation cost if not updated regularly)
    uint funding;
    bool public funded = false;
    Token token; 
    
    function Goal(){ //Constructor
        
    }
    
    function addTask() public {}
    
    
    function addRepeatedTask() public {}
    
    function completeTask(uint index) public {
        Tasks.complete(current_tasks[index]);
        remove(index);
    }
    

    
    
    function checkFunding() returns (bool){ //Goal only begins once contract is funded
        return token.balanceOf(this.address) >= funding;
    }
    
}