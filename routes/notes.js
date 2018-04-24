const router=require("express").Router();
const data=require("../data");
const notesData=data.notes;
const usersData=data.users;

router.get("/", async (req,res)=>{
    res.status(200).send("Note root");
});




module.exports=router;