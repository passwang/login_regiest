var MongoClient = require("mongodb").MongoClient;
function _connectDB(callback) {
    var url = "mongodb://localhost:27017/student";
    MongoClient.connect(url, function (err, db) {
        callback(err, db);
    })

}
//增
exports.insertArray = function (collectionName, array, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).insertMany(array, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}
//查
exports.find = function (collectionName, json, callback) {
    // var num = jsonpage.pageAmount || 0;
    // var page = jsonpage.pageAmount*jsonpage.page ||0;
    // if(arguments.length === 5) {
    //     var sort = sort.sort || {};
    // }
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).find(json).toArray(function (err, docs) {
            callback(err, docs);
            db.close();
        })
    })
}
//删
exports.delete = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).deleteOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}
//改
exports.update = function (collectionName, json, json2, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).updateOne(json, json2, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}