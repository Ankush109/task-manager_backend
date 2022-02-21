//CRUD operations :-
const mongodb =require("mongodb")
const mongoclient =mongodb.MongoClient
const objectID = mongodb.ObjectId
const connectionurl ="mongodb://127.0.0.1:27017"
const databasename = "task-manager"
// const id = new objectID()
// console.log(id);
// console.log(id.getTimestamp());
mongoclient.connect(connectionurl,{useNewUrlParser:true},(error,client)=>{
if(error){
    console.log("unable to connect to database");
}

 const db = client.db(databasename)
//  db.collection("task-manager").insertOne({
//      _id:id,
//      name:"tojo",
//      age:19
//  },(error,result)=>{
// if(error){
//     return console.log("unable to insert user")
// }
// console.log(result.acknowledged);
//  })
// db.collection("users").insertMany([
//     {
//         name:"soham kanji",
//         age:19
//     },{
//         name:"debanjan dasgupta",
//         age:22

//     }

// ],(error,result)=>{
// if(error){
//     return console.log("unable to insert documents");
// }
// console.log(result.insertedIds);
// })
// db.collection("task-manager").insertMany([
//     {
//         description:"i have no money",
//         completed:true
//     },{
//         description:"make money",
//         completed:false 
//     }
// ],(error,results)=>{
//     if(error){
//         console.log("some error happended in the insertion of documents");
//     }
//     console.log(results.insertedIds);
// })
// db.collection("task-manager").findOne({name:"tojo"},(error,user)=>{
//     if(error){
//         return console.log("unable to fetch");
//     }
//     console.log(user);
// })
//  db.collection("task-manager").updateMany({
//  completed:"no"
// },{
//     $set:{
//         completed:"yes"
//     }
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
db.collection("users").deleteMany({
    age:19
}).then((result)=>{
console.log(result);
}).catch((error)=>{
console.log(error);
})
})

