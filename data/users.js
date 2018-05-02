const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const ObjectId = require('mongodb').ObjectId;

async function getAllUsers(){
    const usersCollection=await users();
    const allUsers=await usersCollection.find({}).toArray();
    //console.log(allUsers);
    let usersList=[];
    for(let i=0;i<allUsers.length;i++){
        let content={
            _id:allUsers[i]._id,
            name:allUsers[i].google.name,
            email:allUsers[i].google.email
          
        }
        usersList.push(content);
    }
    console.log(usersList[0]);
    return usersList; 
}

async function getTheUser(userId){
    if(!userId)  throw "No userId provided.";
    const usersCollection=await users();
    const theUser=await usersCollection.findOne({_id:ObjectId(userId)});
    if(theUser){
        return theUser;
    }   
}

async function addUser(id,name,email){
    const usersCollection=await users();
    let newUser={
        _id:new ObjectId(),
        name:name,
        email:email
    }
    const userInfo=await usersCollection.updateOne({_id: ObjectId()},newUser);
    if(userInfo.insertedCount==0) throw "Could not add user.";
    return newUser;
}

module.exports={getAllUsers,getTheUser,addUser};