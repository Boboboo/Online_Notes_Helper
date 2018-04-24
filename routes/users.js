const router=require("express").Router();
const data=require("../data");
const notesData=data.notes;
const usersData=data.users;

router.get("/", async (req,res)=>{
    res.status(200).send("User root");
});

router.get("/all", async (req,res)=>{
    try{
        const all=await usersData.getAllUsers();
        console.log(all);
        res.json(all); 
    }catch(e){
        console.log(e);
        
    }   
});


router.post("/",async(req,res)=>{
    let userInfo=req.body;
    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create a user." });
        return;
    }
    if(!userInfo.name){
        res.status(400).json({error:"You must provide a name"});
        return;
       
    }
    if(!userInfo.email){
        res.status(400).json({error:"You must provide a email"});
        return;  
    }
    try{
        const newUser=await usersData.addUser(userInfo._id,userInfo.name,userInfo.email);
        res.json(newUser);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});




module.exports=router;