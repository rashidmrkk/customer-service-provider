const connection = require("../mongoDb/connection");
const { ObjectID } = require("mongodb");

exports.getUsersInCategory = (req, res) => {
  console.log("getUsersInCategory");
  const lat = parseFloat(req.body.lat);
  const lng = parseFloat(req.body.lng);
  console.log(req.body.category_id);
  const db = connection.getDb();
    // db.collection("service_provider").createIndex({ location: "2dsphere" }, function (err,result){
    //     if(err) throw err
    //     else{
    //         console.log("indexing success");
    //     }

    // })
  db.collection("service_provider")
    .aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "dist.calculated",
          maxDistance: 15000,
          //  query: { category: "Parks" },
          //  includeLocs: "dist.location",
          spherical: true,
        },
      },
      {
        $match: {
            category_id: ObjectID(req.body.category_id),
        },
      },
      {
        $lookup: {
          from: "registration",
          localField: "reg_id",
          foreignField: "_id",
          as: "reg",
        },
      },
      {
        $unwind: "$reg",
      },
      {
        $project: {
          name: "$reg.name",
          phone: "$reg.phone",
        },
      },
    ])
    .toArray((err, result) => {
      if (err) throw err;
      else {
        console.log(result);
        return res.json(result);
      }
    });
};
