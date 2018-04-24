const notesRoutes=require("./notes");
const usersRoutes=require("./users");

const constructorMethod = (app) => {
    app.use("/notes",notesRoutes);
    app.use("/users",usersRoutes);
    
    app.use("*", (req, res) => {
        res.status(404).json({error:"Route Not Found"});
    });

};

module.exports = constructorMethod;