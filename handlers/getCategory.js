const connection = require("../mongoDb/connection");
exports.getCategory = (req, res) => {
 console.log("getCategory");
  const db = connection.getDb();
    db.collection("categories").find({}).toArray((err,result)=>{
        if(err) throw err
        else{
            console.log(result);
            return res.json(result)

        }
    })
  
};
