var mongoose = require ("mongoose");

//Save a reference to the schema constructor//
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema ({
    title: {
     type: String,
     required: true   
    },
    link:{
        type: String,
        required: true
    }

});

var Article = mongoose.model ("Article", ArticlesSchema);
module.exports = Article;