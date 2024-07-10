// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0;

contract Upload {
    struct Access{
        address user;
        bool access; // Giving access to the users of your file
    }
    mapping(address => string[]) value; // storing the address as string(url)
    mapping(address => mapping(address => bool)) ownership; // access true or false
    mapping(address => Access[]) accessList; // Creating an array of whom to give access
    mapping(address => mapping(address => bool)) prevData; 

    function add(address _user, string memory url) external{
        value[_user].push(url); // pushing the address as an url
    }

    function allow(address user) external{
        ownership[msg.sender][user] = true; // Giving the address access to the file
        if(prevData[msg.sender][user]){ // Checking if the user was previously given access
            for(uint i=0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == user){ // Finding the user in accesList
                    accessList[msg.sender][i].access=true; // Making access true in accessList
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user, true)); 
            prevData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public{ // Revoking permission to access file
        ownership[msg.sender][user] = false; 
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }
    
    function display(address _user) external view returns(string[] memory){ 
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return value[_user];
    }
    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}