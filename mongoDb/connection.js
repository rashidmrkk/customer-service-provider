const {MongoClient} = require('mongodb')
const uri ="mongodb+srv://rashidkk:rashidkk@cluster0.tc6zd.mongodb.net/<dbname>?retryWrites=true&w=majority"
let _db
const connectDb = async (callback) =>{
    try{
        MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true },(err,client)=>{
            if(!err){
                _db=client.db("demo")
                console.log("connected to mongo db");
            }
            return callback(err)
        })
    }catch(e){
        throw e
    }
}
const getDb =()=>_db
const closeConnection = ()=> _db.close()
module.exports = {connectDb,getDb,closeConnection}



// const {MongoClient} = require('mongodb')
// const uri ="mongodb://localhost:27017/med_plus"
// const dbName = "med_plus"
// let _db
// const connectDb = async (callback) =>{
//     try{
//         MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true },(err,client)=>{
//             if(!err){
//                 _db=client.db()
//                 console.log("connected to mongo db");
//             }
//             return callback(err)
//         })
//     }catch(e){
//         throw e
//     }
// }
// const getDb =()=>_db
// const closeConnection = ()=> _db.close()
// module.exports = {connectDb,getDb,closeConnection}

